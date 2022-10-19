import { User } from "../../auth/entities/user.entity";
import { Comment } from "./comment.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from "typeorm";

@Entity({ name: 'media'})
export class Media {
    @PrimaryColumn('int')
    id: number;

    @Column('text', {default: 'null'})
    profilePath: string;

    @Column('text')
    title: string;

    @Column('text')
    type: string;

    @ManyToMany(() => User, (user) => user.favorites)
    users: User[] 

    // @OneToMany(() => Comment, (comment) => comment.media)
    // comments: Comment[]

    addUser(users: User[]){
        console.log(this.users)
        
        if(this.users === undefined){
            this.users = new Array<User>();
        }
        console.log(users)
        users.forEach(user => {
            if(!users.includes(user)){
                this.users.push(user)
            }
        })
        console.log(this.users)
    }
}
