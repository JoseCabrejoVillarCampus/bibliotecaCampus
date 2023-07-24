import { Expose, Type, Transform } from 'class-transformer';
import { IsDate, MaxLength, MinLength, IsNumber, IsEmail, IsString } from 'class-validator';
export class reservaDTO {
    @Expose({ name: 'id' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato prestamo incumple los parametros acordados`};},{ toClassOnly: true})
    ID: number;
    @Expose({ name: 'id_usuario' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato usuario incumple los parametros acordados`};},{ toClassOnly: true})
    usuario: number;
    @Expose({ name: 'id_libro' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato usuario incumple los parametros acordados`};},{ toClassOnly: true})
    libro: number;
    @Expose({ name: 'fecha_reserva' })
    @IsDate()
    @Transform(({value})=> {if(/^\d{4}-\d{2}-\d{2}$/.test(value) || value == undefined) return(value); else throw {status: 400, message:`el parámetro fecha_prestamo para tiempo inicio no es válido, debe seguir la sintaxis AAAA-MM-DD`};}, {toClassOnly:true})
    reserva: Date;
    @Expose({ name: 'fecha_reserva_fin' })
    @IsDate()
    @Transform(({value})=> {if(/^\d{4}-\d{2}-\d{2}$/.test(value) || value == undefined) return(value); else throw {status: 400, message:`el parámetro fecha_devolucion para tiempo inicio no es válido, debe seguir la sintaxis AAAA-MM-DD`};}, {toClassOnly:true})
    reserva_fin: Date;
    @Expose({ name: 'estado' })
    @IsString()
    @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ 0-9]+$/.test(value)) return value; else throw {status: 400, message:`El dato tipo_categoria incumple los parametros acordados`};},{ toClassOnly: true})
    estad: string;
    @Expose({ name: 'idd' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato idd incumple los parametros acordados`};},{ toClassOnly: true})
    ID2: number;
    constructor(ID: number, usuario: number, libro:number, reserva:Date, reserva_fin: Date, estad: string, ID2: number) {
        this.ID = ID;
        this.usuario = usuario;
        this.libro = libro;
        this.reserva = reserva;
        this.reserva_fin = reserva_fin;
        this.estad = estad;
        this.ID2 = ID2;
    }
}