import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from './entities/media.entity';
import { Comment } from './entities/comment.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [MediaController],
  providers: [MediaService],
  imports: [TypeOrmModule.forFeature([Media, Comment]), AuthModule]
})
export class MediaModule {}
