import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SigninDto, SignupDto } from './dtos/auth';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private prismaService: PrismaService, private jwtService: JwtService) {}

    async signup(data: SignupDto){
        const userAlreadyExists = await this.prismaService.user.findUnique({
            where: {
                email: data.email,
            }
        });

        if (userAlreadyExists) {
            throw new UnauthorizedException('Email já cadastrado!')
        }
        
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await this.prismaService.user.create({data: {
            ...data,
            password: hashedPassword,
        },
    
    });
    console.log('Usuário salvo:', user);

        console.log(data)

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,

        };
    }

    async signin(data: SigninDto){
        const user = await this.prismaService.user.findUnique({
            where: {
                email: data.email,
            }
        });

        if (!user){
            throw new UnauthorizedException('Credenciais inválidas!')
        }

        const passwordMatch = await bcrypt.compare(data.password, user.password);

        if (!passwordMatch){
            throw new UnauthorizedException('Credenciais inválidas!')
        }

        const acessToken = await this.jwtService.signAsync({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        })
        return {acessToken};
    }
}
