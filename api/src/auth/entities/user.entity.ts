import { Media } from "../../media/entities/media.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('text', {unique: true})
    email: string

    @Column('text', {select: false})
    password: string

    @Column('text')
    fullName: string

    @Column('bool', {default: true})
    isActive: true

    @Column('text', {array: true, default: ['user']})
    roles: string[]

    @ManyToMany(() => Media, (media) => media.users)
    @JoinTable()
    favorites: Media[]
}
