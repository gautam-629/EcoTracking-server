import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SpotService } from './spot.service';
import { SpotController } from './spot.controller';
import { spotSchema } from './entities/spot.entity';
import { categorySchema } from './entities/spot.category.entities';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'spots', schema: spotSchema },
      { name: 'Category', schema: categorySchema },
    ]),
  ],
  controllers: [SpotController],
  providers: [SpotService],
})
export class SpotModule {}
