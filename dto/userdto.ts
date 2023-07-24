import { Expose, Type, Transform } from 'class-transformer';
import { IsDefined, MaxLength, MinLength, IsNumber, IsEmail, IsString } from 'class-validator';
export class usuarioDTO {
    @Expose({ name: 'id' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato usuario incumple los parametros acordados`};},{ toClassOnly: true})
    ID: number;
    @Expose({ name: 'nombre' })
    @IsString()
    @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ 0-9]+$/.test(value)) return value; else throw {status: 400, message:`El dato tipo_categoria incumple los parametros acordados`};},{ toClassOnly: true})
    nom_com: string; 
    @Expose({ name: 'email' })
    @IsEmail()
    @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ 0-9]+$/.test(value)) return value; else throw {status: 400, message:`El dato tipo_categoria incumple los parametros acordados`};},{ toClassOnly: true})
    ema: string;
    @Expose({ name: 'password' })
    @IsString()
    @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ 0-9]+$/.test(value)) return value; else throw {status: 400, message:`El dato tipo_categoria incumple los parametros acordados`};},{ toClassOnly: true})
    psw: string;
    @Expose({ name: 'idd' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato idd incumple los parametros acordados`};},{ toClassOnly: true})
    ID2: number;
    constructor(ID: number, nom_com: string, ema: string, psw: string, ID2: number) {
        this.ID = ID;
        this.nom_com = nom_com;
        this.ema = ema;
        this.psw = psw;
        this.ID2 = ID2;
    }
}