import { Injectable } from '@nestjs/common'
import { CreateRequestDTO, ProjectListItemDTO, UpdateRequestDTO } from './projects.dto'

@Injectable()
export class ProjectsService {
  findAll(): ProjectListItemDTO[] {
    return [
      {
        id: '1',
        name: 'Projeto 1',
        description: 'Descrição do projeto 1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Projeto 2',
        description: 'Descrição do projeto 2',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]
  }

  findOne(id: string): ProjectListItemDTO {
    return {
      id,
      name: `Projeto ${id}`,
      description: 'Descrição do projeto',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  }

  create(data: CreateRequestDTO): ProjectListItemDTO {
    return {
      id: 'uuid',
      name: data.name,
      description: data.description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  }

  update(id: string, data: UpdateRequestDTO): ProjectListItemDTO {
    return {
      id,
      name: data.name,
      description: data.description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  }

  delete(id: string) {
    return `Projeto ${id} deletado com sucesso!`
  }
}
