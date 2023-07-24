import { Expose, Type, Transform } from 'class-transformer';
import { IsDefined, MaxLength, MinLength, IsNumber, IsEmail, IsString } from 'class-validator';
export class autorDTO {
    @Expose({ name: 'id' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato autor incumple los parametros acordados`};},{ toClassOnly: true})
    ID: number;
    @Expose({ name: 'nombre' })
    @IsString()
    @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ 0-9]+$/.test(value)) return value; else throw {status: 400, message:`El dato tipo_categoria incumple los parametros acordados`};},{ toClassOnly: true})
    nom_aut: string; 
    @Expose({ name: 'apellido' })
    @IsString()
    @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ 0-9]+$/.test(value)) return value; else throw {status: 400, message:`El dato tipo_categoria incumple los parametros acordados`};},{ toClassOnly: true})
    ape_aut: string;
    @Expose({ name: 'nacionalidad' })
    @IsString()
    @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ 0-9]+$/.test(value)) return value; else throw {status: 400, message:`El dato tipo_categoria incumple los parametros acordados`};},{ toClassOnly: true})
    nac_aut: string;  
    @Expose({ name: 'idd' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato idd incumple los parametros acordados`};},{ toClassOnly: true})
    ID2: number;
    constructor(ID: number, nom_aut: string, ape_aut: string, nac_aut: string, ID2: number) {
        this.ID = ID;
        this.nom_aut = nom_aut;
        this.ape_aut = ape_aut;
        this.nac_aut = nac_aut;
        this.ID2 = ID2;
    }
}