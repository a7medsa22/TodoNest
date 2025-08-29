import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length, length, MinLength } from "class-validator";
import { UserRole } from "src/util/user-role.type";

export class CreateUserDto {
 @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    @Length(3,50)
    @IsString()
    name:string

    @IsNotEmpty()
    @MinLength(6)
    @IsString()
    password:string
    @IsOptional() 
  @IsEnum(UserRole)
  role?: UserRole; 
}
