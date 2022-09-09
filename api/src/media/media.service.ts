import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { Media } from './entities/media.entity';

@Injectable()
export class MediaService {
  private readonly logger = new Logger('MediaService')

  @InjectRepository(Media)
  private readonly mediaRepository: Repository<Media>
  async create(createMediaDto: CreateMediaDto) {
    // const {id, profilePath, title, type } = createMediaDto;
    try{
      const media = this.mediaRepository.create(createMediaDto)
      await this.mediaRepository.save(media)
      return `${createMediaDto.title} has been saved`;
    } catch (e) {
      this.handleDBExceptions(e)
    }
  }

  findAll() {
    return `This action returns all media`;
  }

  async findOneByTypeID(id: number, type: string) {
    let mediaInDB: Media
    try{
      mediaInDB = await this.mediaRepository.findOneBy({id, type})
      if(!mediaInDB) throw new NotFoundError(`No media with id: ${id} and type: ${type}`);
      return mediaInDB;
    } catch (e) {
      this.handleDBExceptions(e)
    }
  }

  update(id: number, updateMediaDto: UpdateMediaDto) {
    return `This action updates a #${id} media`;
  }

  remove(id: number) {
    return `This action removes a #${id} media`;
  }

  private handleDBExceptions(e:any){
    if(e.name === 'QueryFailedError') {
      throw new BadRequestException ('Please check {id} is a number and type is {movie} or {tv}')
    }
    this.logger.error(e)
    if(e.message) throw new BadRequestException(e)
    throw new InternalServerErrorException('Unexpected, check server logs');
  }
}
