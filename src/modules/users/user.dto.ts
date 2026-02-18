import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { Role } from 'src/generated/prisma/enums'

export class CreateUserDTO {
  @ApiProperty({ description: 'Nome do usuário' })
  @IsString()
  @IsNotEmpty()
  name!: string

  @ApiProperty({ description: 'E-mail do usuário', uniqueItems: true })
  @IsNotEmpty()
  @IsEmail()
  email!: string

  @ApiProperty({ description: 'Senha do usuário', minLength: 6 })
  @IsString()
  @IsNotEmpty()
  password!: string

  @ApiProperty({
    description: 'Tipo do usuário',
    enum: Role,
    default: Role.ADMIN,
    required: false,
  })
  @IsEnum(Role)
  @IsOptional()
  role: Role = Role.ADMIN
}

export class UpdateUserDTO {
  @ApiProperty({ description: 'Nome do usuário', required: false })
  @IsString()
  @IsOptional()
  name?: string

  @ApiProperty({
    description: 'Tipo do usuário',
    enum: Role,
    default: Role.ADMIN,
    required: false,
  })
  @IsEnum(Role)
  @IsOptional()
  role?: Role
}

export class UserListItemDTO {
  @ApiProperty() id!: string
  @ApiProperty() name!: string
  @ApiProperty() email!: string
  @ApiProperty() avatar!: string
  @ApiProperty() role!: Role
  @ApiProperty() createdAt!: Date
  @ApiProperty() updatedAt!: Date
}
