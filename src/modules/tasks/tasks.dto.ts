import { TaskPriority, TaskStatus } from "src/generated/prisma/enums";

export class TaskDTO{
  title!: string;
  description!: string;
  status?: TaskStatus = TaskStatus.TODO;
  priority?: TaskPriority = TaskPriority.MEDIUM;
  dueDate?: string;
}
