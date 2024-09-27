import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Libro {
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    @Column()
    author:string;

    @Column()
    year:number;

    @Column({default:true})
    disponibilidad:boolean;
    
    @CreateDateColumn()
    createdAt:Date;
    
    @UpdateDateColumn()
    updatedAt:Date;

    @DeleteDateColumn()
    deletedAt:Date;
}
