import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { PhotoModule } from './modules/photo/photo.module';

@Module({
  imports: [DbModule, PhotoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
