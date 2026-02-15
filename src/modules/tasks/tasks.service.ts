import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService){}

  async findAllByProject(projectId: string){
    return this.prisma.task.findMany({
      where: {
        projectId
      },
      include: {
        project: true
      }
    })
  }

  async findOne(projectId: string, taskId: string){
    return this.prisma.task.findFirst({
      where: {
        id: taskId,
        projectId
      },
      include: {
        project: true
      }
    })
  }

  async create(projectId: string, data: any){
    return this.prisma.task.create({
      data: {
        ...data,
        projectId
      },
      include: {
        project: true
      }
    })
  }

  async update(projectId: string, taskId: string, data: any){
      const taskExist = await this.findOne(projectId, taskId)
      if(!taskExist){
        throw new HttpException('Tarefa não encontrada', HttpStatus.NOT_FOUND)
      }

      return this.prisma.task.update({
        where: {
          id: taskId,
          projectId
        },
        data,
        include: {
          project: true
        }
      })
  }

  async delete(projectId: string, taskId: string){
    const taskExist = await this.findOne(projectId, taskId)
    if( !taskExist ||taskExist === null){
      throw new HttpException('Não foi possível deletar a tarefa, pois ela não existe', HttpStatus.NOT_FOUND)
    }
    await this.prisma.task.delete({
      where: {
        id: taskId,
        projectId
      }
    })
  }

}
