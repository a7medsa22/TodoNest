import { IsOptional, IsString, Length } from "class-validator";
import { CreateTasksDto } from "./create-tasks.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateTasksDto extends PartialType(CreateTasksDto) {}