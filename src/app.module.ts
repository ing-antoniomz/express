import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'tonho',
      password: '2305',
      database: 'apdiamantes',
      autoLoadEntities: true,
      synchronize: false,
    }),
    UsuariosModule,
  ],
})
export class AppModule {}
