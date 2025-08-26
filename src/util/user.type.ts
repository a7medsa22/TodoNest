import { UserRole } from "@prisma/client";

export type UserResponse = {
id:number;
email:string;
name:string;
role:UserRole;
createdAt:Date;
}
export interface AuthResponse{
    acssess_token:string;
    user:UserResponse
}