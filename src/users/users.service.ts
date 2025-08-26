import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserResponse } from 'src/util/user.type';

@Injectable()
export class UsersService {
  constructor(private prisma:PrismaService){}


  async createUser(dto: CreateUserDto):Promise<UserResponse> {
    return  this.prisma.user.create({
      data: dto,
      select:this.userSelect
    });
  }

  findAll():Promise<UserResponse[]> {
    return this.prisma.user.findMany({
      select:this.userSelect
    });
  }

  findOne(id: number):Promise<UserResponse | null> {
    return this.prisma.user.findUnique({where:{id},select:this.userSelect});
  }

  // For authentication - returns password
   findOneByEmailWithPassword(email: string) {
    return  this.prisma.user.findUnique({where:{email}});
  }
    // Public method - excludes password
  findOneByEmail(email: string):Promise<UserResponse|null> {
    return this.prisma.user.findUnique({where:{email},select:this.userSelect});
  }

  update(id: number, dto: UpdateUserDto):Promise<UserResponse> {
    return this.prisma.user.update({where:{id},data:dto ,select:this.userSelect});
  }

  remove(id: number) {
    return this.prisma.user.delete({where:{id}});
  }

  private readonly userSelect = {
  id: true,
  email: true,
  name: true,
  role: true,
  createdAt: true,
  }
}
