import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuarios.entity';
import * as bcrypt from 'bcrypt';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
    constructor(
        @InjectRepository(Usuario)
        private usuariosRepo: Repository<Usuario>,
    ) {}

    findAll() {
        return this.usuariosRepo.find({
            order: {
                id: 'ASC'
            }
        });
    }

    findOne(id: number) {
        return this.usuariosRepo.findOneBy({ id });
    }

    async create(usuario: CreateUsuarioDto) {
        const existeUser = await this.usuariosRepo.findOne({ where: { username: usuario.username } });
        if (existeUser) throw new ConflictException('El usuario ya existe');

        const existeEmail = await this.usuariosRepo.findOne({ where: { email: usuario.email } });
        if (existeEmail) throw new ConflictException('El email ya existe');

        // Hash password
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(usuario.password, salt);

        const nuevo = this.usuariosRepo.create(usuario);
        return this.usuariosRepo.save(nuevo);
    }


    async update(id: number, usuarioData: UpdateUsuarioDto) {
    const usuario = await this.usuariosRepo.findOne({ where: { id } });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    // Validar que el nuevo user no exista en otro registro
    if (usuarioData.username && usuarioData.username !== usuario.username) {
        const existeUser = await this.usuariosRepo.findOne({ where: { username: usuarioData.username } });
        if (existeUser) throw new ConflictException('El usuario ya existe');
        }

        // Validar que el nuevo email no exista en otro registro
        if (usuarioData.email && usuarioData.email !== usuario.email) {
        const existeEmail = await this.usuariosRepo.findOne({ where: { email: usuarioData.email } });
        if (existeEmail) throw new ConflictException('El email ya existe');
        }

        // Hash password si se envía
        if (usuarioData.password) {
        const salt = await bcrypt.genSalt(10);
        usuarioData.password = await bcrypt.hash(usuarioData.password, salt);
        }

        // Actualizar
        await this.usuariosRepo.update(id, usuarioData);
        return this.usuariosRepo.findOne({ where: { id } });
    }

    async remove(id: number) {
        await this.usuariosRepo.delete(id);
        return { deleted: true };
    }
}
