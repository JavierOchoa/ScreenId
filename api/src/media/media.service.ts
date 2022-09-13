import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { User } from '../auth/entities/user.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { Media } from './entities/media.entity';
import { RemovePayload } from './interfaces/remove-payload.interface';

@Injectable()
export class MediaService {
  private readonly logger = new Logger('MediaService')

  @InjectRepository(Media)
  private readonly mediaRepository: Repository<Media>
  async create(createMediaDto: CreateMediaDto) {
    try{
      // const {id, profilePath, title, type } = createMediaDto;
      const media = this.mediaRepository.create(createMediaDto)
      await this.mediaRepository.save(media)
      return media;
    } catch (e) {
      this.handleDBExceptions(e)
    }
  }

  async addToFavorites(createMediaDto: CreateMediaDto, userToAdd: User){
    try{
      const {id, type} = createMediaDto;
      let media = await this.findOneByTypeID(id, type);
      if(!media) {
        media = await this.create(createMediaDto);
        media.users = [userToAdd];
      }
      const currentUsers = media.users.map(user=>user);
      const idList = currentUsers.map(user => user.id);
      if(!idList.includes(userToAdd.id)){
        media.users = [...currentUsers, userToAdd];
      }
      await this.mediaRepository.save(media)
      return media;
    } catch (e) {
      this.handleDBExceptions(e)
    }
  }

  async removeFromFavorites(removePayload: RemovePayload, userToDelete: User){
    const {id, type} = removePayload;
    console.log(id)
    try{
      let media = await this.findOneByTypeID(+id, type);
      console.log(media);
      if(!media) throw new NotFoundError(`No media with id: ${id} and type: ${type}`);
      // TODO: FIX
      const userList = media.users.filter(user=>user.id !== user.id);
      media.users = userList;
      await this.mediaRepository.save(media)
      return media;
    } catch (e) {
      console.log(e);
      
    }
  }

  findAll() {
    return `This action returns all media`;
  }

  async findOneByTypeID(id: number, type: string) {
    let mediaInDB: Media
    try{
      mediaInDB = await this.mediaRepository.findOneBy({id, type})
      // if(!mediaInDB) throw new NotFoundError(`No media with id: ${id} and type: ${type}`);
      if(!mediaInDB) return;
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
