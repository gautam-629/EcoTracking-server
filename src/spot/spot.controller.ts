import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, ParseFilePipeBuilder, HttpStatus, Query } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { SpotService } from './spot.service';
import { CreateSpotDto } from './dto/create-spot.dto';
import { UpdateSpotDto } from './dto/update-spot.dto';

@Controller('spot')
export class SpotController {
  constructor(private readonly spotService: SpotService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  create(
    @Body() createSpotDto: CreateSpotDto,
    @UploadedFiles(
      new ParseFilePipeBuilder()
        // .addFileTypeValidator({
        //   fileType: 'image/jpeg',
        // })
        .addMaxSizeValidator({
          maxSize: 1024 * 1024 * 5, // 5 MB
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          fileIsRequired: false,
        })
    )
    images: Express.Multer.File[]
  ) {
    return this.spotService.create(createSpotDto, images);
  }

  @Get()
  findAll(
    @Query('name') name?: string,
    @Query('description') description?: string,
    @Query('categories') categories?: string,
    @Query('type') type?: 'Hiking' | 'Trekking'
  ) {
    const filters = { name, description, categories: categories?.split(','), type };
    return this.spotService.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.spotService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('images'))
  update(
    @Param('id') id: string,
    @Body() updateSpotDto: UpdateSpotDto,
    @UploadedFiles(
      new ParseFilePipeBuilder()
        // .addFileTypeValidator({
        //   fileType: 'image/jpeg',
        // })
        .addMaxSizeValidator({
          maxSize: 1024 * 1024 * 5, // 5 MB
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          fileIsRequired: false,
        })
    )
    images: Express.Multer.File[]
  ) {
    return this.spotService.update(id, updateSpotDto, images);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.spotService.remove(id);
  }
}