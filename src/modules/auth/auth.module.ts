import { DbModule } from 'src/db/db.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { userProviders } from 'src/entity/user/user.providers';

@Module({
  imports: [DbModule],
  controllers: [AuthController],
  providers: [AuthService, UserService, ...userProviders],
})
export class AuthModule {}
