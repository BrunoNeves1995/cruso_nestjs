import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common'
import { CreateRequestDTO, UpdateRequestDTO } from './projects.dto'
import { ProjectsService } from './projects.service'

@Controller({ version: '1', path: 'projects' })
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  findAll() {
    return this.projectsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectsService.findById(id)
  }

  @Post()
  create(@Body() data: CreateRequestDTO) {
    return this.projectsService.create(data)
  }

  @Put(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() data: UpdateRequestDTO) {
    return this.projectsService.update(id, data)
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectsService.delete(id)
  }
}
