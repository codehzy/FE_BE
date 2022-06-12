import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { PhotoModule } from './modules/photo/photo.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [DbModule, PhotoModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
