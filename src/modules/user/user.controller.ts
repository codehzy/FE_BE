import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserFindByEmail, UsersDTO } from 'src/dto/userdto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 注册
   * @param data 用户注册信息 json
   * @returns
   */
  @Post('register')
  @ApiTags('注册用户')
  // @ApiBody({ description: '用户名', type: UsersDTO })
  async register(@Body() data: UsersDTO) {
    const { email } = data;
    const checkUser = await this.findByEmail(email);
    if (checkUser) {
      return {
        HttpStatus: 201,
        message: '用户已存在',
      };
    }

    const user = await this.userService.register(data);
    return {
      statusCode: HttpStatus.OK,
      message: '用户创建成功',
      user,
    };
  }

  /**
   * 查找用户
   * @param email 用户邮箱
   * @returns
   */
  @Get('findByEmail')
  @ApiTags('根据邮箱查询某个用户')
  // @ApiBody({ name: 'email', description: '用户id' })
  @ApiQuery({ name: 'email', description: '用户email', type: UserFindByEmail })
  async findByEmail(@Query('email') email: string) {
    console.log(email);

    return await this.userService.findByEmail(email);
  }
}
