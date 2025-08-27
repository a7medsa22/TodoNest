import { IsDateString, IsEnum, isEnum, IsOptional } from "class-validator"
import { TaskPriority, TaskStatus } from "../enums/task-status.enum"

export class FilterTaskDto{
    @IsOptional()
    @IsEnum(TaskStatus)
    status?:string
    @IsOptional()
    @IsEnum(TaskPriority)
    priority?:string
    @IsOptional()
   @IsDateString()
    dueDateFrom?:string
   @IsDateString()
    @IsOptional()
    dueDataTo?:string

}