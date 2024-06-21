import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports:[UsersModule,PassportModule,JwtModule.register({
    secret:jwtConstants.secret,
    signOptions:{expiresIn:'60s'}
  })],
  providers: [AuthService,LocalStrategy,LocalAuthGuard,JwtStrategy],
  exports:[AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
