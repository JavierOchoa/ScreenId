import { User } from "../../auth/entities/user.entity";
import { Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";

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
