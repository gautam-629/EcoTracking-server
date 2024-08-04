import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateSpotDto } from './dto/create-spot.dto';
import { UpdateSpotDto } from './dto/update-spot.dto';
import { ISpot } from './entities/spot.entity';
import * as fs from 'fs/promises';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SpotService {
  constructor(@InjectModel('spots') private readonly spotModel: Model<ISpot>) {}

  async create(createSpotDto: CreateSpotDto, images: Express.Multer.File[]): Promise<ISpot> {
    const createdSpot = new this.spotModel(createSpotDto);
    if (images && images.length > 0) {
      const imageUrls = await this.saveImages(images);
      createdSpot.images = imageUrls;
    }
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
        matchStage.name = { $regex: filters.name, $options: 'i' };
      }
      if (filters.description) {
        matchStage.description = { $regex: filters.description, $options: 'i' };
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

      return pipeline.length > 0 ? await this.spotModel.aggregate(pipeline).exec() : await this.spotModel.find().exec();
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

  async update(id: string, updateSpotDto: UpdateSpotDto, images?: Express.Multer.File[]): Promise<ISpot> {
    const updateData: Partial<ISpot> = { ...updateSpotDto };
  
    if (images && images.length > 0) {
      const imageUrls = await this.saveImages(images);
      updateData.images = imageUrls;
    }
  
    const updatedSpot = await this.spotModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
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

  
  private async saveImages(images: Express.Multer.File[]): Promise<string[]> {


    const uploadDir = path.resolve(__dirname,'../uploads');
   
    // Ensure the upload directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    const savedPaths = await Promise.all(images.map(async (image) => {
      const fileExtension = path.extname(image.originalname);
      const fileName = `${uuidv4()}${fileExtension}`;
      const filePath = path.join(uploadDir, fileName);

      await fs.writeFile(filePath, image.buffer);

      // Return the path relative to the upload directory
      return `/uploads/${fileName}`;
    }));

    return savedPaths;
  }
}
