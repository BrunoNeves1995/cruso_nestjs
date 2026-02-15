import { Injectable } from '@nestjs/common'
import { CreateRequestDTO, UpdateRequestDTO } from './projects.dto'

@Injectable()
export class ProjectsService {
  findAll() {
    return ['Projeto 1', 'Projeto 2', 'Projeto 3']
  }

  findById(id: string) {
    return `Projeto ${id}`
  }

  create(data: CreateRequestDTO) {
    return 'Projeto criado com sucesso!'
  }

  update(id: string, data: UpdateRequestDTO) {
    return `Projeto ${id} atualizado com sucesso!`
  }

  delete(id: string) {
    return `Projeto ${id} deletado com sucesso!`
  }
}
