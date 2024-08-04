import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SpotService } from './spot.service';
import { SpotController } from './spot.controller';
import { spotSchema } from './entities/spot.entity';
import { categorySchema } from './entities/spot.category.entities';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'spots', schema: spotSchema },
      { name: 'Category', schema: categorySchema },
    ]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), 
    
      serveRoot: '/uploads', // The URL path to serve static files
    }),
  ],
  controllers: [SpotController],
  providers: [SpotService],
})
export class SpotModule {}
