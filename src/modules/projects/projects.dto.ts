import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

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
  @ApiProperty({})
  id!: string
  @ApiProperty({})
  name!: string
  @ApiProperty({})
  description!: string
  @ApiProperty({ format: 'date-time' })
  createdAt!: string
  @ApiProperty({ format: 'date-time' })
  updatedAt!: string
}

export class UpdateRequestDTO {
  @ApiProperty({ description: 'Project name' })
  @IsString()
  name!: string
  @ApiProperty({ description: 'Project description', required: false })
  @IsString()
  description!: string
}
