import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserEntity } from '../entity/user.entity';

// 클라이언트에서 서버에 대한 요청과 응답 역할을 함.
// Post 혹은 Get을 통해 데이터를 select, inesert, update, delete를 할 수 있음.
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() user: UserEntity): Promise<UserEntity> {
    return await this.userService.create(user);
  }

  @Get()
  async findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() password: UserEntity,
  ): Promise<UserEntity> {
    return this.userService.update(id, password);
  }
}
