import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserFindByEmail, UserFindOne, UsersDTO } from 'src/dto/userdto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('用户模块')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 注册
   * @param data 用户注册信息 json
   * @returns
   */
  @Post('register')
  @ApiOperation({
    summary: '注册用户',
  })
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
  @ApiOperation({
    summary: '根据邮箱查询某个用户',
  })
  @ApiQuery({ name: 'email', description: '用户email', type: UserFindByEmail })
  async findByEmail(@Query('email') email: string) {
    console.log(email);

    return await this.userService.findByEmail(email);
  }

  /**
   * 通过用户唯一id查找用户
   * @param uuid 用户唯一id
   * @returns
   */
  @Get()
  @ApiOperation({
    summary: '根据用户uuid查找用户',
  })
  @ApiQuery({ name: 'uuid', description: '用户uuid', type: UserFindOne })
  async findOne(@Query('uuid') uuid: string) {
    return await this.userService.findOne(uuid);
  }

  @Put('/update/:email')
  @ApiOperation({
    summary: '根据用户email更新用户信息',
  })
  async updateUser(@Param('email') email: string, @Body() data: UsersDTO) {
    const checkUser = await this.findByEmail(email);
    if (!checkUser) {
      return {
        HttpStatus: 201,
        message: '用户不存在',
      };
    }

    await this.userService.updateUser(email, data);
    return {
      status: HttpStatus.OK,
      message: '用户信息更新成功',
    };
  }

  /**
   * 根据用户邮箱删除用户
   * @param email 用户邮箱
   * @returns
   */
  @Delete('/delete/:email')
  @ApiOperation({
    summary: '根据用户email删除用户',
  })
  async deleteOne(@Param('email') email: string) {
    const checkUser = await this.findByEmail(email);
    if (!checkUser) {
      return {
        HttpStatus: 201,
        message: '用户不存在',
      };
    }

    await this.userService.deleteUser(email);
    return {
      status: HttpStatus.OK,
      message: '用户删除成功',
    };
  }

  /**
   * 清空数据库中user表中所有数据
   */
  @Get('clearUser')
  @ApiOperation({
    summary: '清空用户表中所有用户',
  })
  async clearUser(@Query('isClear') isClear: boolean) {
    return await this.userService.clearUser(isClear);
  }
}
