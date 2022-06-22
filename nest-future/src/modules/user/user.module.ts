import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { userProviders } from 'src/entity/user/user.providers';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [DbModule],
  controllers: [UserController],
  providers: [...userProviders, UserService],
})
export class UserModule {}
