import { Exclude } from "class-transformer";
import { Reservacione } from "src/reservaciones/entities/reservacione.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Usuario {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({unique: true,nullable: false})
    email: string;

    @Exclude()
    @Column({nullable: false})
    password: string;

    @Column({default: 'user'})
    rol: string;
    
    @CreateDateColumn()
    createdAt:Date;
    
    @UpdateDateColumn()
    updatedAt:Date;

    @DeleteDateColumn()
    deletedAt:Date;

    @OneToMany(() => Reservacione, (reservacione) => reservacione.usuario) // Relación uno a muchos
    reservaciones: Reservacione[];
}
