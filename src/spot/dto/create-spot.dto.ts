import { IsString, IsEnum, IsNumber, IsArray, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

enum DifficultyLevel {
  Easy = 'Easy',
  Moderate = 'Moderate',
  Difficult = 'Difficult',
}

enum SpotType {
  Hiking = 'Hiking',
  Trekking = 'Trekking',
}

export class CreateSpotDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsEnum(DifficultyLevel)
  difficultyLevel: DifficultyLevel;

  @IsEnum(SpotType)
  type: SpotType;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsArray()
  @IsOptional()
  @Type(() => String)
  categories?: string[];

  @IsArray()
  @IsOptional()
  @Type(() => String)
  images?: string[];
}