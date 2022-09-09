import { Column, Entity, PrimaryColumn } from "typeorm";

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
}
