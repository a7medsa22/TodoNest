export class TasksEntity {
  id: number;
  name: string;
  description: string;
  status: 'OPEN | IN PROGRESS | COMPLETED';

  userId: number;
}