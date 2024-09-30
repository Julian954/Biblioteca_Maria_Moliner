import { Reservacione } from "src/reservaciones/entities/reservacione.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @OneToOne(() => Reservacione, (reservacione) => reservacione.libro) // Relación uno a uno
    reservacion: Reservacione;
}
