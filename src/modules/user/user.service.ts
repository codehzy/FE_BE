import { Repository } from 'typeorm';
import { Inject, Injectable, HttpCode } from '@nestjs/common';
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
   * 通过邮箱：查找用户
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

  /**
   * 通过用户唯一id查找用户
   * @param uuid 用户唯一id
   * @returns
   */
  async findOne(uuid: string): Promise<UsersDTO> {
    return await this.userRepository.findOne({
      where: {
        uuid: uuid,
      },
    });
  }

  /**
   * 根据用户email 和 data来更新
   * @param email 用户email地址
   * @param data  要变更的信息
   * @returns
   */
  async updateUser(email: string, data: Partial<UsersDTO>) {
    await this.userRepository.update({ email }, data);
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  /**
   * 根据用户邮箱删除用户
   * @param email 用户邮箱
   * @returns
   */
  async deleteUser(email: string) {
    await this.userRepository.delete({ email });
    return {
      HttpStatus: 200,
      message: '删除成功',
    };
  }

  /**
   * 清空数据库中user表中所有数据
   */
  async clearUser(isClearAll: boolean) {
    if (isClearAll) {
      await this.userRepository.clear();
      return {
        HttpStatus: 200,
        message: '清空user表成功',
      };
    }
  }
}
