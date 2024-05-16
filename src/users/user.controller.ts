import { UserService } from './users.service';
import { Controller, Get, Logger, Query } from '@nestjs/common';
import { UsersResponseDto } from './users.response.dto';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers(@Query('page') page: number) {
    this.logger.log('Get all users');
    const [usersList, total] = await this.userService.findAll(page || 1);
    return { usersList: usersList.map((user) => UsersResponseDto.fromUsersEntity(user)), total };
  }
}
