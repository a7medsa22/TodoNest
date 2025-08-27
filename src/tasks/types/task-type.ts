import { TaskPriority, TaskStatus } from "../enums/task-status.enum";

export interface TaskResponse{
    id:number;
    title:string;
    description:string | null;
    status:TaskStatus;
    priority:TaskPriority;
    dueDate:Date | null;
    createdAt:Date;
    updatedAt:Date;
    userId:number
}