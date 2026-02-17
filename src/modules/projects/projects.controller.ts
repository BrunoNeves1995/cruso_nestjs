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
import { ApiResponse } from '@nestjs/swagger'
import { ValidateResourcesIds } from 'src/common/decorator/validate-resources-ids.decorator'
import { ValidateResourcesIdsInterceptor } from 'src/common/interceptor/validate-resources-ids.interceptor'
import { CreateRequestDTO, ProjectListItemDTO, UpdateRequestDTO } from './projects.dto'
import { ProjectsService } from './projects.service'

@Controller({ version: '1', path: 'projects' })
@UseInterceptors(ValidateResourcesIdsInterceptor)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @ApiResponse({ type: [ProjectListItemDTO] })
  async findAll() {
    return await this.projectsService.findAll()
  }

  @Get(':projectId')
  @ApiResponse({ type: ProjectListItemDTO })
  @ValidateResourcesIds()
  async findOne(@Param('projectId', ParseUUIDPipe) id: string) {
    return await this.projectsService.findOne(id)
  }

  @Post()
  @ApiResponse({ type: ProjectListItemDTO })
  async create(@Body() data: CreateRequestDTO) {
    return this.projectsService.create(data)
  }

  @Put(':projectId')
  @ApiResponse({ type: ProjectListItemDTO })
  @ValidateResourcesIds()
  async update(@Param('projectId', ParseUUIDPipe) id: string, @Body() data: UpdateRequestDTO) {
    return this.projectsService.update(id, data)
  }

  @Delete(':projectId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ValidateResourcesIds()
  delete(@Param('projectId', ParseUUIDPipe) id: string) {
    return this.projectsService.delete(id)
  }
}
