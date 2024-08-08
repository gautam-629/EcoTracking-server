import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CatModule } from './cat/cat.module';
import { SpotModule } from './spot/spot.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AuthModule, UsersModule,MongooseModule.forRoot('mongodb+srv://root:tMJl4HpD3ur5fVLa@cluster0.ctlruaz.mongodb.net/Eco-Tracking?retryWrites=true&w=majority&appName=Cluster0'), CatModule, SpotModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


