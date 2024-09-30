import { Libro } from "src/libros/entities/libro.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";

@Entity()
export class Reservacione {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Usuario, (usuario) => usuario.reservaciones, { eager: true }) // Relación muchos a uno con Usuario
    usuario: Usuario;

    @OneToOne(() => Libro, { eager: true }) // Relación uno a uno con Libro
    @JoinColumn() // Relaciona con la tabla Libro
    libro: Libro;

    @Column()
    inicio_reservacion: Date;

    @Column()
    final_reservacion: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
