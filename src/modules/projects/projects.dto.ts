import { ApiProperty } from '@nestjs/swagger'

export class CreateRequestDTO {
  @ApiProperty({ description: 'Project name' })
  name!: string

  @ApiProperty({ description: 'Project description', required: false })
  description!: string
}

export class UpdateRequestDTO {
  name!: string
  description!: string
}
