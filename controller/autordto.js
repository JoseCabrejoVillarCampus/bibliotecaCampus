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
export class autorDTO {
    constructor(ID, nom_aut, ape_aut, nac_aut, ID2) {
        this.ID = ID;
        this.nom_aut = nom_aut;
        this.ape_aut = ape_aut;
        this.nac_aut = nac_aut;
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
], autorDTO.prototype, "ID", void 0);
__decorate([
    Expose({ name: 'nombre' }),
    IsString(),
    Transform(({ value }) => { if (/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ 0-9]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `El dato tipo_categoria incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], autorDTO.prototype, "nom_aut", void 0);
__decorate([
    Expose({ name: 'apellido' }),
    IsString(),
    Transform(({ value }) => { if (/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ 0-9]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `El dato tipo_categoria incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], autorDTO.prototype, "ape_aut", void 0);
__decorate([
    Expose({ name: 'nacionalidad' }),
    IsString(),
    Transform(({ value }) => { if (/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ 0-9]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `El dato tipo_categoria incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], autorDTO.prototype, "nac_aut", void 0);
__decorate([
    Expose({ name: 'idd' }),
    IsNumber(),
    Transform(({ value }) => { if (/^[0-9]+$/.test(value) || value == undefined)
        return Math.floor(value);
    else
        throw { status: 400, message: `El dato idd incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], autorDTO.prototype, "ID2", void 0);
