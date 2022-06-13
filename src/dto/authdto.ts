import { ApiPropertyOptional } from '@nestjs/swagger';
import { UsersDTO } from './userdto';

export class authDto extends UsersDTO {}

export class loginData {
  @ApiPropertyOptional({
    description: '邮箱',
  })
  email: string;

  @ApiPropertyOptional({
    description: '密码',
  })
  password: string;
}
