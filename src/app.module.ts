import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MySQLService } from './database.service';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService,MySQLService],
  exports:[MySQLService]
})
export class AppModule {}
