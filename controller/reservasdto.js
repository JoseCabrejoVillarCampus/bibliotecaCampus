var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose, Transform } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';
export class reservaDTO {
    constructor(ID, usuario, libro, reserva, reserva_fin, estad, ID2) {
        this.ID = ID;
        this.usuario = usuario;
        this.libro = libro;
        this.reserva = reserva;
        this.reserva_fin = reserva_fin;
        this.estad = estad;
        this.ID2 = ID2;
    }
}
__decorate([
    Expose({ name: 'id' }),
    IsNumber(),
    Transform(({ value }) => { if (/^[0-9]+$/.test(value) || value == undefined)
        return Math.floor(value);
    else
        throw { status: 400, message: `El dato prestamo incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], reservaDTO.prototype, "ID", void 0);
__decorate([
    Expose({ name: 'id_usuario' }),
    IsNumber(),
    Transform(({ value }) => { if (/^[0-9]+$/.test(value) || value == undefined)
        return Math.floor(value);
    else
        throw { status: 400, message: `El dato usuario incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], reservaDTO.prototype, "usuario", void 0);
__decorate([
    Expose({ name: 'id_libro' }),
    IsNumber(),
    Transform(({ value }) => { if (/^[0-9]+$/.test(value) || value == undefined)
        return Math.floor(value);
    else
        throw { status: 400, message: `El dato usuario incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], reservaDTO.prototype, "libro", void 0);
__decorate([
    Expose({ name: 'fecha_reserva' }),
    IsDate(),
    Transform(({ value }) => { if (/^\d{4}-\d{2}-\d{2}$/.test(value) || value == undefined)
        return (value);
    else
        throw { status: 400, message: `el parámetro fecha_prestamo para tiempo inicio no es válido, debe seguir la sintaxis AAAA-MM-DD` }; }, { toClassOnly: true }),
    __metadata("design:type", Date)
], reservaDTO.prototype, "reserva", void 0);
__decorate([
    Expose({ name: 'fecha_reserva_fin' }),
    IsDate(),
    Transform(({ value }) => { if (/^\d{4}-\d{2}-\d{2}$/.test(value) || value == undefined)
        return (value);
    else
        throw { status: 400, message: `el parámetro fecha_devolucion para tiempo inicio no es válido, debe seguir la sintaxis AAAA-MM-DD` }; }, { toClassOnly: true }),
    __metadata("design:type", Date)
], reservaDTO.prototype, "reserva_fin", void 0);
__decorate([
    Expose({ name: 'estado' }),
    IsString(),
    Transform(({ value }) => { if (/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ 0-9]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `El dato tipo_categoria incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], reservaDTO.prototype, "estad", void 0);
__decorate([
    Expose({ name: 'idd' }),
    IsNumber(),
    Transform(({ value }) => { if (/^[0-9]+$/.test(value) || value == undefined)
        return Math.floor(value);
    else
        throw { status: 400, message: `El dato idd incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], reservaDTO.prototype, "ID2", void 0);
