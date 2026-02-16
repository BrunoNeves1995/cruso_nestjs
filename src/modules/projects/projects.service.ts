import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateRequestDTO, ProjectListItemDTO, UpdateRequestDTO } from './projects.dto'

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<ProjectListItemDTO[]> {
    const projects = await this.prisma.project.findMany().then((projects) => {
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

    if (projects.length <= 0 || !projects) {
      throw new HttpException('Nenhum projeto encontrado', HttpStatus.NOT_FOUND)
    }

    return projects
  }

  async findOne(id: string): Promise<ProjectListItemDTO | null> {
    const project = await this.prisma.project.findFirst({
      where: {
        id,
      },
    })

    if (!project || project === null) {
      throw new HttpException('Projeto não encontrado', HttpStatus.NOT_FOUND)
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
      throw new HttpException('Erro ao criar projeto', HttpStatus.BAD_REQUEST)
    }

    return {
      ...project,
      createdAt: project.createdAt.toISOString(),
      updatedAt: project.updatedAt.toISOString(),
    }
  }

  async update(id: string, data: UpdateRequestDTO): Promise<ProjectListItemDTO> {
    const projectExist = await this.findOne(id)

    if (!projectExist || projectExist === null) {
      throw new HttpException('Erro ao atualiazar projeto', HttpStatus.NOT_FOUND)
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
    if (!projectExist || projectExist === null) {
      return new HttpException('Projeto não encontrado', HttpStatus.NOT_FOUND)
    }

    try {
      await this.prisma.project.delete({
        where: {
          id,
        },
      })
    } catch (error: any) {
      if (error.code === 'P2003') {
        throw new NotFoundException(
          'Você não pode deletar um projeto que possui tarefas',
          HttpStatus.BAD_REQUEST.toString(),
        )
      }
    }
  }
}
