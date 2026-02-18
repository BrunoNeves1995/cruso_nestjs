import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
      },
    })
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
        createdProjects: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
      },
    })
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
      },
    })
  }

  async create(data: any) {
    return await this.prisma.user.create({
      data,
    })
  }

  async update(id: string, data: any) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data,
    })
  }

  async delete(id: string) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    })
  }
}
