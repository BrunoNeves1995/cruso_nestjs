import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller({version: '1', path: 'projects/:projectId/tasks'})
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAllByProject(
    @Param('projectId', ParseUUIDPipe) projectId: string
  ) {
    return this.tasksService.findAllByProject(projectId);
  }

  @Get(':taskId')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('projectId',ParseUUIDPipe) projectId: string,
    @Param('taskId', ParseUUIDPipe) taskId: string,
  ) {
    return this.tasksService.findOne(projectId, taskId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Body() data: any
  ) {
    return this.tasksService.create(projectId, data);
  }

  @Put(':taskId')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @Body() data: any,
  ) {
    return this.tasksService.update(projectId, taskId, data);
  }

  @Delete(':taskId')
    @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Param('taskId', ParseUUIDPipe) taskId: string,
  ) {
    return this.tasksService.delete(projectId, taskId);
  }

}
