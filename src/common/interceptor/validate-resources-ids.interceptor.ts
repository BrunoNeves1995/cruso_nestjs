import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { VALIDATE_RESOURCES_IDS_KEY } from 'src/consts'
import { PrismaService } from 'src/modules/prisma/prisma.service'

@Injectable()
export class ValidateResourcesIdsInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<Request>> {
    // Verificar se endpoint possui o decoretor @ValidateResourceIds()
    const shouldValidate = this.reflector.get<boolean>(
      VALIDATE_RESOURCES_IDS_KEY,
      context.getHandler(),
    )

    if (!shouldValidate) {
      return next.handle()
    }

    // Validar o projectId da URL
    const request = context.switchToHttp().getRequest()
    const projectId = request.params.projectId

    // Fazendo a validação no banco de dados ProjectId
    const project = await this.prisma.project.findFirst({
      where: {
        id: projectId,
      },
    })

    if (!project) {
      throw new NotFoundException('Project not found')
    }

    // Fazendo a validação no banco de dados TaskId
    const taskId = request.params.taskId

    const task = await this.prisma.task.findFirst({
      where: {
        projectId,
        id: taskId,
      },
    })

    if (!task) {
      throw new NotFoundException('Task not found')
    }

    return next.handle()
  }
}
