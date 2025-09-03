import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuarios.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
    constructor(private readonly usuariosService: UsuariosService) {}

    @Get()
    findAll() {
        return this.usuariosService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.usuariosService.findOne(id);
    }

    @Post()
    create(@Body() usuarioDto: CreateUsuarioDto) {
        return this.usuariosService.create(usuarioDto);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() usuarioDto: UpdateUsuarioDto) {
        return this.usuariosService.update(id, usuarioDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.usuariosService.remove(id);
    }
}
