import { Media } from '../../media/entities/media.entity';
import { Comment } from '../../media/entities/comment.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { select: false })
  password: string;

  @Column('text')
  fullName: string;

  @Column('bool', { default: true })
  isActive: boolean;

  @Column('text', { array: true, default: ['user'] })
  roles: string[];

  @ManyToMany(() => Media, (media) => media.users)
  @JoinTable()
  favorites: Media[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
