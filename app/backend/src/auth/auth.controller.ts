import { Body, Controller, Post } from '@nestjs/common';
import { SigninDto, SignupDto } from './dtos/auth'
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // auth/signup
    @Post('signup')
    async signup(@Body() body: SignupDto) {
        console.log({body});
        return this.authService.signup(body);
    }

    // auth/signin
    @Post('signin')
    async signin(@Body() body: SigninDto) {
        console.log({body});

        await this.authService.signin(body);
        return body;
    }
}
