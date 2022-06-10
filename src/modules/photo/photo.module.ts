import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { photoProviders } from 'src/entity/photo/photo.providers';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';

@Module({
  imports: [DbModule],
  controllers: [PhotoController],
  providers: [...photoProviders, PhotoService],
})
export class PhotoModule {}
