import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MySQLService } from 'src/database.service';

@Module({
  providers: [UsersService,MySQLService],
  exports:[UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
