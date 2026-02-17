import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'
import { TaskPriority, TaskStatus } from 'src/generated/prisma/enums'

export class CreateRequestDTO {
  @ApiProperty({ description: 'Project name' })
  @IsString()
  @IsNotEmpty()
  name!: string

  @ApiProperty({ description: 'Project description', required: false })
  @IsString()
  description!: string
}

export class ProjectListItemDTO {
  @ApiProperty({}) id!: string
  @ApiProperty({}) name!: string
  @ApiProperty({}) description!: string
  @ApiProperty({ format: 'date-time' }) createdAt!: string
  @ApiProperty({ format: 'date-time' }) updatedAt!: string
}

export class UpdateRequestDTO {
  @ApiProperty({ description: 'Project name' })
  @IsString()
  name!: string
  @ApiProperty({ description: 'Project description', required: false })
  @IsString()
  description!: string
}

export class ProjectTasksDTO {
  @ApiProperty({}) id!: string
  @ApiProperty({}) title!: string
  @ApiProperty({ nullable: true, required: false }) description?: string
  @ApiProperty({
    enum: TaskStatus,
    default: TaskStatus.TODO,
  })
  status!: string
  @ApiProperty({
    enum: TaskPriority,
    default: TaskPriority.MEDIUM,
  })
  priority!: string
  @ApiProperty({ nullable: true, required: false, format: 'date-time' }) dueDate?: string
  @ApiProperty({ format: 'date-time' }) createdAt!: string
  @ApiProperty({ format: 'date-time' }) updatedAt!: string
}

export class ProjectFullDTO extends ProjectListItemDTO {
  @ApiProperty({ type: [ProjectTasksDTO] }) tasks!: ProjectTasksDTO[]
}
