import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, unique: true })
    user: string;

    @Column({ length: 100 })
    nombre: string;

    @Column({ name: 'apellido_paterno', length: 100 })
    apellidoPaterno: string;

    @Column({ name: 'apellido_materno', length: 100, nullable: true })
    apellidoMaterno: string;

    @Column({ name: 'cuenta_ap', length: 50, nullable: true })
    cuentaAp: string;

    @Column({ default: true })
    status: boolean;

    @Column({ unique: true, length: 150 })
    email: string;

    @Column()
    password: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;
}
