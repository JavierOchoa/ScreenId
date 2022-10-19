import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { User } from '../auth/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { Media } from './entities/media.entity';
import { RemovePayload } from './interfaces/remove-payload.interface';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class MediaService {
  private readonly logger = new Logger('MediaService')

  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ){}

  async create(createMediaDto: CreateMediaDto) {
    try{
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
    try{
      let media = await this.findOneByTypeID(+id, type);
      if(!media) throw new NotFoundError(`No media with id: ${id} and type: ${type}`);
      const userList = media.users.filter(user=>user.id !== userToDelete.id);
      media.users = userList;
      await this.mediaRepository.save(media)
      return media;
    } catch (e) {
      console.log(e);
      
    }
  }

  async findAll(user: User) {
    try{
      const userInDB = await this.userRepository.findOne({where: {id: user.id}, relations: {favorites : true}})
      if(!userInDB) throw new NotFoundError(`No user with ID: ${user.id}`);
      return userInDB.favorites;
    } catch (e) {
      console.log(e)
    }
  }

  async findOneByTypeID(id: number, type: string) {
    let mediaInDB: Media
    try{
      mediaInDB = await this.mediaRepository.findOne({where: {id, type}, relations: {users: true}})
      if(!mediaInDB) return;
      return mediaInDB;
    } catch (e) {
      this.handleDBExceptions(e)
    }
  }

  async createComment(createCommentDto: CreateCommentDto){
    try {
      const comment = this.commentRepository.create(createCommentDto);
      await this.commentRepository.save(comment);
      return comment;
    } catch (e) {
      this.handleDBExceptions(e)
    }
  }

  async findOneCommentByTypeID(mediaType: string, mediaId: string) {
    let commentInDB: Comment;
    try {
      commentInDB = await this.commentRepository.findOne({where: {mediaType, mediaId}, relations: {user: true}})
      if(!commentInDB) return;
      return commentInDB;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async addComment(createCommentDto: CreateCommentDto, user: User) {
    try {
      const commentOnDB = await this.createComment(createCommentDto);
      commentOnDB.user = user;
      await this.commentRepository.save(commentOnDB);
      return commentOnDB;
    } catch (error) {
      this.handleDBExceptions(error)
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
