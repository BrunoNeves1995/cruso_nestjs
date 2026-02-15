import { Controller, Delete, Get, Post, Put } from '@nestjs/common'
import { ProjectsService } from './projects.service'

@Controller({ version: '1', path: 'projects' })
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  findAll() {
    return this.projectsService.findAll()
  }

  @Get(':id')
  findById(id: string) {
    return this.projectsService.findById(id)
  }

  @Post()
  create(data: any) {
    return this.projectsService.create(data)
  }

  @Put(':id')
  update(id: string, data: any) {
    return this.projectsService.update(id, data)
  }

  @Delete(':id')
  delete(id: string) {
    return this.projectsService.delete(id)
  }
}
