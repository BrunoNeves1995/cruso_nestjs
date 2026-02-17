import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    })
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    })
  }

  async findAll() {
    return await this.prisma.user.findMany()
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
