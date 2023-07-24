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
import { IsNumber, IsString } from 'class-validator';
export class libroDTO {
    constructor(ID, autor, categoria, editorial, nom_tit, anio_pub, is_bn, num_pag, estado, ID2) {
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
__decorate([
    Expose({ name: 'id' }),
    IsNumber(),
    Transform(({ value }) => { if (/^[0-9]+$/.test(value) || value == undefined)
        return Math.floor(value);
    else
        throw { status: 400, message: `El dato autor incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], libroDTO.prototype, "ID", void 0);
__decorate([
    Expose({ name: 'id_autor' }),
    IsNumber(),
    Transform(({ value }) => { if (/^[0-9]+$/.test(value) || value == undefined)
        return Math.floor(value);
    else
        throw { status: 400, message: `El dato autor incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], libroDTO.prototype, "autor", void 0);
__decorate([
    Expose({ name: 'id_categoria' }),
    IsNumber(),
    Transform(({ value }) => { if (/^[0-9]+$/.test(value) || value == undefined)
        return Math.floor(value);
    else
        throw { status: 400, message: `El dato autor incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], libroDTO.prototype, "categoria", void 0);
__decorate([
    Expose({ name: 'id_editorial' }),
    IsNumber(),
    Transform(({ value }) => { if (/^[0-9]+$/.test(value) || value == undefined)
        return Math.floor(value);
    else
        throw { status: 400, message: `El dato autor incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], libroDTO.prototype, "editorial", void 0);
__decorate([
    Expose({ name: 'titulo' }),
    IsString(),
    Transform(({ value }) => { if (/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ 0-9]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `El dato tipo_categoria incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], libroDTO.prototype, "nom_tit", void 0);
__decorate([
    Expose({ name: 'anio_publicacion' }),
    IsString(),
    Transform(({ value }) => { if (/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ 0-9]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `El dato tipo_categoria incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], libroDTO.prototype, "anio_pub", void 0);
__decorate([
    Expose({ name: 'isbn' }),
    IsString(),
    Transform(({ value }) => { if (/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ 0-9]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `El dato tipo_categoria incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], libroDTO.prototype, "is_bn", void 0);
__decorate([
    Expose({ name: 'num_paginas' }),
    IsNumber(),
    Transform(({ value }) => { if (/^[0-9]+$/.test(value) || value == undefined)
        return Math.floor(value);
    else
        throw { status: 400, message: `El dato autor incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], libroDTO.prototype, "num_pag", void 0);
__decorate([
    Expose({ name: 'id_estado' }),
    IsNumber(),
    Transform(({ value }) => { if (/^[0-9]+$/.test(value) || value == undefined)
        return Math.floor(value);
    else
        throw { status: 400, message: `El dato autor incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], libroDTO.prototype, "estado", void 0);
__decorate([
    Expose({ name: 'idd' }),
    IsNumber(),
    Transform(({ value }) => { if (/^[0-9]+$/.test(value) || value == undefined)
        return Math.floor(value);
    else
        throw { status: 400, message: `El dato idd incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], libroDTO.prototype, "ID2", void 0);
