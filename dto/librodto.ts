import { Expose, Type, Transform } from 'class-transformer';
import { IsDefined, MaxLength, MinLength, IsNumber, IsEmail, IsString } from 'class-validator';
export class libroDTO {
    @Expose({ name: 'id' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato autor incumple los parametros acordados`};},{ toClassOnly: true})
    ID: number;
    @Expose({ name: 'id_autor' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato autor incumple los parametros acordados`};},{ toClassOnly: true})
    autor: number;
    @Expose({ name: 'id_categoria' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato autor incumple los parametros acordados`};},{ toClassOnly: true})
    categoria: number;
    @Expose({ name: 'id_editorial' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato autor incumple los parametros acordados`};},{ toClassOnly: true})
    editorial: number;
    @Expose({ name: 'titulo' })
    @IsString()
    @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ 0-9]+$/.test(value)) return value; else throw {status: 400, message:`El dato tipo_categoria incumple los parametros acordados`};},{ toClassOnly: true})
    nom_tit: string; 
    @Expose({ name: 'anio_publicacion' })
    @IsString()
    @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ 0-9]+$/.test(value)) return value; else throw {status: 400, message:`El dato tipo_categoria incumple los parametros acordados`};},{ toClassOnly: true})
    anio_pub: string;
    @Expose({ name: 'isbn' })
    @IsString()
    @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ 0-9]+$/.test(value)) return value; else throw {status: 400, message:`El dato tipo_categoria incumple los parametros acordados`};},{ toClassOnly: true})
    is_bn: string;  
    @Expose({ name: 'num_paginas' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato autor incumple los parametros acordados`};},{ toClassOnly: true})
    num_pag: number;
    @Expose({ name: 'id_estado' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato autor incumple los parametros acordados`};},{ toClassOnly: true})
    estado: number;
    @Expose({ name: 'idd' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato idd incumple los parametros acordados`};},{ toClassOnly: true})
    ID2: number;
    constructor(ID: number, autor: number, categoria:number, editorial:number,nom_tit: string, anio_pub: string, is_bn: string, num_pag:number, estado:number,ID2: number) {
        this.ID = ID;
        this.autor = autor;
        this.categoria = categoria;
        this.editorial = editorial;
        this.nom_tit = nom_tit;
        this.anio_pub = anio_pub;
        this.is_bn = is_bn;
        this.num_pag = num_pag;
        this.estado = estado;
        this.ID2 = ID2;
    }
}