import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { User } from '../auth/entities/user.entity';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { RemovePayload } from './interfaces/remove-payload.interface';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('/add')
  @Auth()
  create(@Body() createMediaDto: CreateMediaDto, @GetUser() user: User) {
    return this.mediaService.addToFavorites(createMediaDto, user);
  }

  @Get('/favorites')
  @Auth()
  findAll(@GetUser() user: User) {
    return this.mediaService.findAll(user);
  }

  @Get(':type/:id')
  findOneByTypeID(@Param('type') type: string,  @Param('id') id: string) {
    return this.mediaService.findOneByTypeID(+id, type);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMediaDto: UpdateMediaDto) {
    return this.mediaService.update(+id, updateMediaDto);
  }

  @Delete('/remove')
  @Auth()
  remove(@Body() removePayload: RemovePayload , @GetUser() user: User) {
    return this.mediaService.removeFromFavorites(removePayload, user);
  }
}
