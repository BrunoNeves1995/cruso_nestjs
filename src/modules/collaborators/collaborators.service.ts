import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateCollaboratorDto, UpdateCollaboratorDto } from './collaborators.dto'

const UserAttributes = {
  user: {
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
    },
  },
}
@Injectable()
export class CollaboratorsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.projectCollaborator.findMany({
      include: UserAttributes,
    })
  }

  async findAllByProject(projectId: string) {
    return this.prisma.projectCollaborator.findMany({
      where: {
        projectId,
      },
      include: UserAttributes,
    })
  }

  async findOne(collaborattorId: string) {
    return this.prisma.projectCollaborator.findUnique({
      where: {
        id: collaborattorId,
      },
      include: {
        user: true,
      },
    })
  }

  async create(projectId: string, data: CreateCollaboratorDto) {
    const user = await this.findOne(data.userId)
    if (!user) {
      throw new NotFoundException('Usuaário não encontrado')
    }

    return this.prisma.projectCollaborator.create({
      data: {
        userId: data.userId,
        role: data.role,
        projectId,
      },
      include: UserAttributes,
    })
  }

  async update(projectId: string, userId: string, data: UpdateCollaboratorDto) {
    const collaborator = await this.prisma.projectCollaborator.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId,
        },
      },
    })
    if (!collaborator) {
      throw new NotFoundException('Colaborador nao faz parte do projeto')
    }

    return this.prisma.projectCollaborator.update({
      where: {
        userId_projectId: {
          userId,
          projectId,
        },
      },
      data: {
        role: data.role,
      },
      include: UserAttributes,
    })
  }

  async delete(projectId: string, userId: string) {
    const collaborator = await this.prisma.projectCollaborator.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId,
        },
      },
    })
    if (!collaborator) {
      throw new NotFoundException('Colaborador nao faz parte do projeto')
    }

    return this.prisma.projectCollaborator.delete({
      where: {
        userId_projectId: {
          userId,
          projectId,
        },
      },
    })
  }
}
