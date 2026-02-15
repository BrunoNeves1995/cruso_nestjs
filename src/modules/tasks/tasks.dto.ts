import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsNotEmpty, isNotEmpty, IsOptional, IsString } from "class-validator";
import { TaskPriority, TaskStatus } from "src/generated/prisma/enums";

export class TaskDTO{
  @ApiProperty({description: "Task titule"})
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({description: "Task description", required: false})
  @IsString()
  @IsOptional()
  description!: string;

  @ApiProperty({
    description: "Task status",
    enum: TaskStatus,
    default: TaskStatus.TODO,
    required: false
  })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus = TaskStatus.TODO;

  @ApiProperty({
    description: "Task priority",
    enum: TaskPriority,
    default: TaskPriority.MEDIUM,
    required: false
  })
  @IsEnum(TaskPriority)
  @IsOptional()
  priority?: TaskPriority = TaskPriority.MEDIUM;

  @ApiProperty({description: "Task dueDate"})
  @IsDateString()
  @IsOptional()
  dueDate?: string;
}
