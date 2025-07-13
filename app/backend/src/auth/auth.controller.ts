import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { SigninDto, SignupDto } from './dtos/auth'
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';

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
        return this.authService.signin(body);
    }


    @UseGuards(AuthGuard)
    @Get('me')
    async me(@Request() request) {
        console.log({request})
        return request.user;
    } 
}
