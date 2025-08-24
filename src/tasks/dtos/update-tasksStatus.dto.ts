import { IsOptional, IsString, Length } from "class-validator";

export class UpdateTasksDto {
  @IsOptional()
  @IsString()
  @Length(3,100) 
  name?: string;
    @IsOptional()
  @IsString()
   @Length(3,100) 
  description?: string;
  @IsString()
  status: string;
}