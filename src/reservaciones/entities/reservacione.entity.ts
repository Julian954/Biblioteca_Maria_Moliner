import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Entity } from "typeorm";

@Entity()
export class Reservacione {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    id_libro: number;

    @Column()
    id_usuario: number;

    @Column()
    inicio_reservacion: Date;

    @Column()
    final_reservacion: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
