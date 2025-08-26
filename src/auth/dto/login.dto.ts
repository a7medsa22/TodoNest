import { IsEmail, IsNotEmpty, isString, IsString, Length, length, MinLength } from "class-validator";

export class LoginDto{
    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    @IsString()
    password:string    

}