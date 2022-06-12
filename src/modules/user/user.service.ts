import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/entity/user/user.entity';
import { UsersDTO } from 'src/dto/userdto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  /**
   * 注册
   * @param data 用户注册信息 json
   * @returns
   */
  async register(data: UsersDTO) {
    const uuid = uuidv4();
    const reqData = Object.assign({ uuid: uuid }, data);

    const user = await this.userRepository.save(reqData);
    return user;
  }

  /**
   * 查找用户
   * @param email 用户邮箱
   * @returns
   */
  async findByEmail(email: string): Promise<UsersDTO> {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }
}
