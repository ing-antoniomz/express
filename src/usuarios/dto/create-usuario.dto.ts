import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
    IsBoolean,
} from 'class-validator';

export class CreateUsuarioDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    user: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    nombre: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    apellidoPaterno: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    apellidoMaterno: string;

    @IsString()
    @IsOptional()
    @MaxLength(50)
    cuentaAp?: string;

    @IsBoolean()
    @IsOptional()
    status?: boolean;

    @IsEmail()
    @IsNotEmpty()
    @MaxLength(150)
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}
