import { CODE } from './../../code/code';
import { UserService } from './../user/user.service';
import { Inject, Injectable, HttpStatus } from '@nestjs/common';
import { authDto, loginData } from 'src/dto/authdto';
import { encryptPassword, makeSalt } from 'src/utils/cryptogram';
import { User } from 'src/entity/user/user.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { registerDTO } from 'src/dto/userdto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  /**
   * 注册用户
   * @param body 注册用户体
   * @returns
   */
  async authRegister(body: registerDTO) {
    const { email, password } = body;
    const userExist = this.userService.findByEmail(email);
    if (!userExist) {
      return {
        HttpStatus: 201,
        message: '用户不存在',
      };
    }
    const uuid = uuidv4();

    // 加盐加密
    const salt = makeSalt();
    const hashPwd = encryptPassword(password, salt);
    Object.keys(body).forEach((item) => {
      if (item === 'password') body[item] = hashPwd;
    });
    const reqBody = Object.assign({ uuid, salt }, body);
    return this.userRepository.save(reqBody);
  }

  /**
   * 用户登录
   * @param body 登录信息
   */
  async login({ email, password }: loginData) {
    // 根据email获取用户
    const user = await this.userService.findByEmail(email);
    if (user) {
      const { password: pwd, salt } = user;
      // 加盐加密
      const hashPwd = encryptPassword(password, salt);

      if (hashPwd === pwd) {
        return {
          code: CODE.REP_OK,
          user,
        };
      } else {
        return {
          code: CODE.REP_OK,
          message: '用户名或者密码错误',
        };
      }
    } else {
      return {
        code: CODE.REP_WARNING,
        message: '用户不存在',
      };
    }
  }
}
