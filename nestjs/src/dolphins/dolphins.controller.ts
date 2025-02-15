import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DolphinsService } from './dolphins.service';
import { CreateDolphinDto } from './dto/create-dolphin.dto';
import { UpdateDolphinDto } from './dto/update-dolphin.dto';

@Controller('dolphins')
export class DolphinsController {
  constructor(private readonly dolphinsService: DolphinsService) {}

  @Post()
  create(@Body() createDolphinDto: CreateDolphinDto) {
    return this.dolphinsService.create(createDolphinDto);
  }

  @Get()
  findAll() {
    return this.dolphinsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dolphinsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDolphinDto: UpdateDolphinDto) {
    return this.dolphinsService.update(+id, updateDolphinDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dolphinsService.remove(+id);
  }
}
