import { Media } from "./media.entity";
import { User } from "../../auth/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'comment'})
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    // @Column('text')
    // author: string;
    
    @Column('text')
    body: string;

    @Column('text')
    mediaType: string;

    @Column('text')
    mediaId: string;

    @ManyToOne(() => User, (user) => user.comments)
    user: User;
}