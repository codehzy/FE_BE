import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PhotoService } from './photo.service';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Get('findAll')
  @ApiTags('官网例子')
  async findAll() {
    return await this.photoService.findAll();
  }
}
