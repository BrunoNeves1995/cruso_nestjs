import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { CollaboratorRole } from 'src/generated/prisma/enums'

export class CreateCollaboratorDto {
  @ApiProperty({ description: 'Usuario ID para adicionar o colaborador' })
  @IsString()
  @IsNotEmpty()
  userId!: string

  @ApiProperty({
    description: 'Usuario ID para adicionar o colaborador',
    enum: CollaboratorRole,
    default: CollaboratorRole.EDITOR,
    required: false,
  })
  @IsEnum(CollaboratorRole)
  @IsOptional()
  role?: CollaboratorRole = CollaboratorRole.EDITOR
}

export class UpdateCollaboratorDto {
  @ApiProperty({
    description: 'Altera o tipo do colaborador',
    enum: CollaboratorRole,
  })
  @IsEnum(CollaboratorRole)
  @IsNotEmpty()
  role!: CollaboratorRole
}

class CollaboratorUserDTO {
  @ApiProperty() id!: string
  @ApiProperty() name!: string
  @ApiProperty() email!: string
  @ApiProperty({ nullable: true }) avatar?: string
}

export class CollaboratorListItemDTO {
  @ApiProperty() id!: string
  @ApiProperty({ enum: CollaboratorRole }) role!: CollaboratorRole
  @ApiProperty() prjectId!: string
  @ApiProperty() userId!: string
  @ApiProperty({ format: 'date-time' }) createdAt!: string

  @ApiProperty({ type: CollaboratorUserDTO })
  user!: CollaboratorUserDTO
}
