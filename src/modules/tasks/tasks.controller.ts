import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller({version: '1', path: 'projects/:projectId/tasks'})
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async findAllByProject(
    @Param('projectId', ParseUUIDPipe) projectId: string
  ) {
    return this.tasksService.findAllByProject(projectId);
  }

  @Get(':taskId')
  async findOne(
    @Param('projectId',ParseUUIDPipe) projectId: string,
    @Param('taskId', ParseUUIDPipe) taskId: string,
  ) {
    return this.tasksService.findOne(projectId, taskId);
  }

  @Post()
  async create(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Body() data: any
  ) {
    return this.tasksService.create(projectId, data);
  }

  @Put(':taskId')
  async update(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @Body() data: any,
  ) {
    return this.tasksService.update(projectId, taskId, data);
  }

  @Delete(':taskId')
  async delete(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Param('taskId', ParseUUIDPipe) taskId: string,
  ) {
    return this.tasksService.delete(projectId, taskId);
  }

}
