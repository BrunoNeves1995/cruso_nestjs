import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateRequestDTO, ProjectListItemDTO, UpdateRequestDTO } from './projects.dto'

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<ProjectListItemDTO[]> {
    return this.prisma.project.findMany().then((projects) => {
      return projects.map((project) => {
        return {
          id: project.id,
          name: project.name,
          description: project.description,
          createdAt: project.createdAt.toISOString(),
          updatedAt: project.updatedAt.toISOString(),
        }
      })
    })
  }

  async findOne(id: string): Promise<ProjectListItemDTO | null> {
    const project = await this.prisma.project.findFirst({
      where: {
        id,
      },
    })

    if (!project) {
      return null
    }

    return {
      ...project,
      createdAt: project.createdAt.toISOString(),
      updatedAt: project.updatedAt.toISOString(),
    }
  }

  async create(data: CreateRequestDTO): Promise<ProjectListItemDTO> {
    const project = await this.prisma.project.create({
      data,
    })

    if (!project) {
      throw new Error('Erro ao criar projeto')
    }

    return {
      ...project,
      createdAt: project.createdAt.toISOString(),
      updatedAt: project.updatedAt.toISOString(),
    }
  }

  async update(id: string, data: UpdateRequestDTO): Promise<ProjectListItemDTO> {
    const projectExist = await this.findOne(id)

    if (!projectExist) {
      throw new Error('Projeto não encontrado')
    }

    const project = await this.prisma.project.update({
      where: {
        id,
      },
      data,
    })

    return {
      ...project,
      updatedAt: project.updatedAt.toISOString(),
      createdAt: project.createdAt.toISOString(),
    }
  }

  async delete(id: string) {
    const projectExist = await this.findOne(id)
    if (!projectExist) {
      return new Error('Projeto não encontrado')
    }

    await this.prisma.project.delete({
      where: {
        id,
      },
    })
  }
}
