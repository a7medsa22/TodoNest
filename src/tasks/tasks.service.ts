import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTasksDto } from './dtos/create-tasks.dto';
import { TaskPriority, TaskStatus } from './enums/task-status.enum';
import { TaskResponse } from './types/task-type';
import { Task } from '@prisma/client';
import { FilterTaskDto } from './dtos/filter-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma:PrismaService){}

  async create(userId:number,dto:CreateTasksDto):Promise<Task>{
   return this.prisma.task.create({
        data:{
          ...dto,
          userId,
          status: dto.status as import('@prisma/client').$Enums.TaskStatus,
          priority: dto.priority || TaskPriority.MEDIUM,
          dueDate: dto.dueDate ? new Date(dto.dueDate) : null
        }
    }); 
  }
  async findAll(userId:number,filter:FilterTaskDto = {}){

    const {where}:any = {userId}

  if(filter.status) where.status 

    return this.prisma.task.findMany();
  }


}
