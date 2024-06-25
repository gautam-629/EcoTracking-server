import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('/users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}
    
    @Post()
  create(@Body() item: any) {
    return this.userService.create(item);
  }
}
