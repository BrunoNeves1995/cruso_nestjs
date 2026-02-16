import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common'
import { ValidateResourcesIds } from 'src/common/decorator/validate-resources-ids.decorator'
import { ValidateResourcesIdsInterceptor } from 'src/common/interceptor/validate-resources-ids.interceptor'
import { TaskDTO } from './tasks.dto'
import { TasksService } from './tasks.service'

@Controller({ version: '1', path: 'projects/:projectId/tasks' })
@UseInterceptors(ValidateResourcesIdsInterceptor)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ValidateResourcesIds()
  async findAllByProject(@Param('projectId', ParseUUIDPipe) projectId: string) {
    return this.tasksService.findAllByProject(projectId)
  }

  @Get(':taskId')
  @HttpCode(HttpStatus.OK)
  @ValidateResourcesIds()
  async findOne(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Param('taskId', ParseUUIDPipe) taskId: string,
  ) {
    return this.tasksService.findOne(projectId, taskId)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ValidateResourcesIds()
  async create(@Param('projectId', ParseUUIDPipe) projectId: string, @Body() data: TaskDTO) {
    return this.tasksService.create(projectId, data)
  }

  @Put(':taskId')
  @HttpCode(HttpStatus.OK)
  @ValidateResourcesIds()
  async update(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @Body() data: TaskDTO,
  ) {
    return this.tasksService.update(projectId, taskId, data)
  }

  @Delete(':taskId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ValidateResourcesIds()
  async delete(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Param('taskId', ParseUUIDPipe) taskId: string,
  ) {
    return this.tasksService.delete(projectId, taskId)
  }
}
