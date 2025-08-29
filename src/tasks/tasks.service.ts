import { flatten, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTasksDto } from './dtos/create-tasks.dto';
import { TaskPriority, TaskStatus } from './enums/task-status.enum';
import { TaskResponse } from './types/task-type';
import { Task } from '@prisma/client';
import { FilterTaskDto } from './dtos/filter-task.dto';
import { UsersService } from 'src/users/users.service';
import { UpdateTasksDto } from './dtos/update-tasksStatus.dto';
import { UserRole } from 'src/util/user-role.enum';
@Injectable()
export class TasksService {
  constructor(private prisma:PrismaService,
    private usersService:UsersService
  ){}

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

  if(filter.status) where.status = filter.status ;
  if(filter.priority) where.priority = filter.priority;

  if(filter.dueDateFrom || filter.dueDataTo) {
    where.dueDate = {};
    if (filter.dueDateFrom) where.dueDate.gte = new Date(filter.dueDateFrom);
    if(filter.dueDataTo) where.dueDate.lte = new Date(filter.dueDataTo);
  };


    return this.prisma.task.findMany({
      where,
      select:this.taskSelect,
      orderBy:[
        {priority:'desc'},
      {dueDate:'asc'},
      {createdAt:'desc'}
        ]
    });
  }
 async findOne(id:number,userId:number){
  const task = await this.prisma.task.findUnique({where:{id},select:this.taskSelect})
  if(!task) throw new NotFoundException('Task not found');


  if(task.userId === userId) throw new ForbiddenException('Access denied to this task');

  return task;
  
 }
async update(id: number, userId: number, dto: UpdateTasksDto){
  await this.findOne(id, userId);
const data: any = {};

  if (dto.title !== undefined) data.title = { set: dto.title };
  if (dto.description !== undefined) data.description = { set: dto.description };
  if (dto.status !== undefined) data.status = { set: dto.status };
  if (dto.priority !== undefined) data.priority = { set: dto.priority };
  if (dto.dueDate !== undefined) {
    data.dueDate = { set: dto.dueDate ? new Date(dto.dueDate) : null };
  }
  return this.prisma.task.update({
    where: { id },
    data,
    select: this.taskSelect,
  });
}

async remove(id:number,userId:number){
  await this.findOne(id,userId)
  return this.prisma.task.delete({
    where:{id},
    select:this.taskSelect
  });
}

 async getTaskStatus(userId:number){
  const tasks = await this.prisma.task.findMany({
    where:{userId},
    select:this.taskSelect,
  });

 return {
      total: tasks.length,
      byStatus: {
        pending: tasks.filter(t => t.status === TaskStatus.PENDING).length,
        inProgress: tasks.filter(t => t.status === TaskStatus.IN_PROGRESS).length,
        completed: tasks.filter(t => t.status === TaskStatus.COMPELLED).length,
        cancelled: tasks.filter(t => t.status === TaskStatus.CANCELLED).length
      },
      byPriority: {
        low: tasks.filter(t => t.priority === TaskPriority.LOW).length,
        medium: tasks.filter(t => t.priority === TaskPriority.MEDIUM).length,
        high: tasks.filter(t => t.priority === TaskPriority.HIGH).length,
        urgent: tasks.filter(t => t.priority === TaskPriority.URGENT).length
      }
    };
 }

   // 🚨 ADMIN ONLY ROUTES - Protected with Roles Guard

 async findAllTasksAdmin() {
  return this.prisma.task.findMany({
    select: {
      ...this.taskSelect,
      user: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    },
    orderBy: [
      { priority: 'desc' },
      { createdAt: 'desc' }
    ]
  });
}

async removeAnyTask(taskId: number){
  const task = await this.prisma.task.findUnique({
    where: { id: taskId },
    select: this.taskSelect
  });

  if (!task) {
    throw new NotFoundException('Task not found');
  }

  return this.prisma.task.delete({
    where: { id: taskId },
    select: this.taskSelect
  });
}

async getGlobalTaskAnalytics() {
  const totalTasks = await this.prisma.task.count();
  const totalUsers = await this.prisma.user.count();

  const tasksByStatus = await this.prisma.task.groupBy({
    by: ['status'],
    _count: { status: true }
  });

  const tasksByPriority = await this.prisma.task.groupBy({
    by: ['priority'],
    _count: { priority: true }
  });

  return {
    overview: {
      totalTasks,
      totalUsers,
      avgTasksPerUser: Math.round(totalTasks / totalUsers * 100) / 100
    },
    byStatus: tasksByStatus.reduce((acc, item) => {
      acc[item.status.toLowerCase()] = item._count.status;
      return acc;
    }, {}),
    byPriority: tasksByPriority.reduce((acc, item) => {
      acc[item.priority.toLowerCase()] = item._count.priority;
      return acc;
    }, {})
  };
}




   private readonly taskSelect = {
    id: true,
    title: true,
    description: true,
    status: true,
    priority: true,
    dueDate: true,
    createdAt: true,
    updatedAt: true,
    userId: true
  };
}
