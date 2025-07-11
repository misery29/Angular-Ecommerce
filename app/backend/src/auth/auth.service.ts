import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SigninDto, SignupDto } from './dtos/auth';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private prismaService: PrismaService) {}

    async signup(data: SignupDto){
        const userAlreadyExists = await this.prismaService.user.findUnique({
            where: {
                email: data.email,
            }
        });

        if (userAlreadyExists) {
            throw new UnauthorizedException('Email já cadastrado!')
        }

        const user = await this.prismaService.user.create({data});

        console.log(data)

        return {
            id: user.id,
            name: user.name,
            email: user.email,
        };
    }

    async signin(data: SigninDto){
        console.log(data)

        return 'signin'
    }
}
