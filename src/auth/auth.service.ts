import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../usuarios/usuarios.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Usuario) private userRepo: Repository<Usuario>,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
  const foundUser = await this.userRepo.findOne({ where: { username } });

  if (!foundUser) return null;

   // Normaliza el hash de Laravel
  const normalizedHash = foundUser.password.replace(/^\$2y\$/, '$2a$');

  const match = await bcrypt.compare(pass, normalizedHash);
  if (match) {
    const { password, ...result } = foundUser;
    return result;
  }
  return null;
}

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}