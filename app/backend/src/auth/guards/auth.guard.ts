import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { jwtConstants } from "../constants";
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private jwtService: JwtService,
                @InjectRedis() private readonly redis: Redis,
    ) {}
    async canActivate(context: ExecutionContext):Promise<boolean>{
        const request = context.switchToHttp().getRequest();

        const token = this.extractTokenFromHeader(request);
        console.log(token)

        if(!token){
            console.log("azin")
            throw new UnauthorizedException()
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: jwtConstants.secret,
            });

            const exists = await this.redis.get(`token:${payload.id}:${token}`);
            if (!exists) {
                throw new UnauthorizedException('Token inválido ou expirado');
            }

            request['user'] = payload;
        } catch (error) {
            console.log("bezin", error)
            console.log(request.headers)
            throw new UnauthorizedException()
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers['authorization']?.split(' ') ?? [];
        return type == 'Bearer' ? token : undefined
    }
}
