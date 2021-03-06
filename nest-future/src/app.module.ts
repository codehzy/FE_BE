import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { PhotoModule } from './modules/photo/photo.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ChatGateway } from './modules/chat/chat.gateway';

@Module({
  imports: [DbModule, PhotoModule, UserModule, AuthModule],
  controllers: [],
  providers: [ChatGateway],
})
export class AppModule {}
