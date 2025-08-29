import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TasksService } from './tasks.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { CreateTasksDto } from './dtos/create-tasks.dto';
import { FilterTaskDto } from './dtos/filter-task.dto';
import { UpdateTasksDto } from './dtos/update-tasksStatus.dto';
import { UserRole } from 'src/util/user-role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
 
interface jwtPayload {
  sub:number
  email:string,
  role:UserRole
}


@Controller('api/v1/tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @HttpCode(201)
  create(@CurrentUser() payload: jwtPayload, @Body() body: CreateTasksDto) {
    return this.tasksService.create(payload.sub, body);
  }

  @Get()
  findAll(@CurrentUser()payload:jwtPayload, @Query() filters:FilterTaskDto) {
    return this.tasksService.findAll(payload.sub, filters);
  }

  @Get('stats')
  getStats(@CurrentUser() payload:jwtPayload) {
    return this.tasksService.getTaskStatus(payload.sub);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @CurrentUser() payload:jwtPayload) {
    return this.tasksService.findOne(id, payload.sub);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @CurrentUser() payload:jwtPayload, @Body() body: UpdateTasksDto) {
    return this.tasksService.update(id, payload.sub, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number, @CurrentUser()payload:jwtPayload) {
    // Pass a third argument as required by the service method, e.g., null or an appropriate value
    return this.tasksService.remove(id, payload.sub);
  }

  // 🚨 ADMIN ONLY ROUTES - Protected with Roles Guard
  @Get('admin/all-tasks')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MODERATOR) 
  getAllUsersTasksAdmin() {
    return this.tasksService.findAllTasksAdmin();
  }

  @Get('admin/user/:userId/tasks')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN) 
  getUserTasksAdmin(
    @Param('userId', ParseIntPipe) id: number,
    @Query() filters: FilterTaskDto
  ) {
    return this.tasksService.findAll(id, filters);
  }

  @Delete('admin/:taskId')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAnyTaskAdmin(@Param('taskId', ParseIntPipe) taskId: number) {
    return this.tasksService.removeAnyTask(taskId);
  }

  // Get task analytics for all users (Admin only)
  @Get('admin/analytics')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  getGlobalAnalytics() {
    return this.tasksService.getGlobalTaskAnalytics();
  }
}


