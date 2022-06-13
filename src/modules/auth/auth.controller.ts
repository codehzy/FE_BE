import { loginData } from './../../dto/authdto';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { registerDTO } from 'src/dto/userdto';

@Controller('auth')
@ApiTags('用户认证模块')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * 注册用户
   * @param body 注册用户体
   * @returns
   */
  @Post('register')
  @ApiOperation({
    summary: '注册用户',
  })
  async authRegister(@Body() body: registerDTO) {
    return await this.authService.authRegister(body);
  }

  /**
   * 用户登录
   * @param body 登录信息
   */
  @Post('login')
  @ApiOperation({
    summary: '用户登录',
  })
  async login(@Body() body: loginData) {
    return await this.authService.login(body);
  }
}
