export interface SignupDto {
    name: string;
    email: string;
    password: string;
    phone:string;
}

export interface SigninDto {
    email: string;
    password:string;
}