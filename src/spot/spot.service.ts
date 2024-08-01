import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose'; // Import Types from mongoose
import { CreateSpotDto } from './dto/create-spot.dto';
import { UpdateSpotDto } from './dto/update-spot.dto';
import { ISpot } from './entities/spot.entity';

@Injectable()
export class SpotService {
  constructor(@InjectModel('spots') private readonly spotModel: Model<ISpot>) {} 

  async create(createSpotDto: CreateSpotDto): Promise<ISpot> {
    const createdSpot = new this.spotModel(createSpotDto);
    return await createdSpot.save();
  }

  async findAll(filters: {
    name?: string;
    description?: string;
    categories?: string[];
    type?: 'Hiking' | 'Trekking';
  } = {}): Promise<ISpot[]> {
    try {
      const pipeline: any[] = [];
      const matchStage: any = {};

      if (filters.name) {
        matchStage.name = { $regex: filters.name, $options: 'i' }; // Case-insensitive regex search
      }

      if (filters.description) {
        matchStage.description = { $regex: filters.description, $options: 'i' }; // Case-insensitive regex search
      }

      if (filters.categories) {
        matchStage.categories = { $in: filters.categories.map(id => new Types.ObjectId(id)) };
      }

      if (filters.type) {
        matchStage.type = filters.type;
      }

      if (Object.keys(matchStage).length > 0) {
        pipeline.push({ $match: matchStage });
      }

      // Only execute aggregation if pipeline is not empty
      if (pipeline.length > 0) {
        return await this.spotModel.aggregate(pipeline).exec();
      } else {
        // If pipeline is empty, find all spots
        return await this.spotModel.find().exec();
      }
    } catch (error) {
      console.error('Error fetching spots:', error);
      throw error;
    }
  }

  async findOne(id: string): Promise<ISpot> {
    const spot = await this.spotModel.findById(id).exec();
    if (!spot) {
      throw new NotFoundException(`Spot with ID ${id} not found`);
    }
    return spot;
  }

  async update(id: string, updateSpotDto: UpdateSpotDto): Promise<ISpot> {
    const updatedSpot = await this.spotModel.findByIdAndUpdate(id, updateSpotDto, { new: true }).exec();
    if (!updatedSpot) {
      throw new NotFoundException(`Spot with ID ${id} not found`);
    }
    return updatedSpot;
  }

  async remove(id: string): Promise<void> {
    const result = await this.spotModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Spot with ID ${id} not found`);
    }
  }
}
