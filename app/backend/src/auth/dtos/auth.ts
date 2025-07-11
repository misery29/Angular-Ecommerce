import { IsEmail, IsNotEmpty, IsPhoneNumber } from "class-validator";

export class SignupDto {
    @IsNotEmpty()
    name: string;
    
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsPhoneNumber('BR')
    phone:string;
}

export class SigninDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password:string;
}