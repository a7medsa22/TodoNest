import { IsOptional, IsString, Length } from "class-validator";

export class CreateTasksDto {
   @IsString()
   @Length(3,100) 
  title: string;
  @IsOptional()
  @IsString()
   @Length(3,100) 
  description: string;
  @IsOptional()
  status: string;

}