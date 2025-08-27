import { isDateString, IsDateString, IsEnum, IsOptional, IsString, Length } from "class-validator";
import { TaskPriority, TaskStatus } from "../enums/task-status.enum";

export class CreateTasksDto {
   @IsString()
   @Length(3,100) 
  title: string;

  @IsOptional()
  @IsString()
  @Length(2,500) 
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsEnum(TaskPriority)
  priority?:TaskPriority

  @IsOptional()
  @IsDateString()
  dueDate?:string

}