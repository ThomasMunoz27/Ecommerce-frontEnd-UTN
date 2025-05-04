import { Rol } from "./enums/Rol"

export interface IUser {
    id: string
    name: string,
    password: string,
    email: string,
    rol: Rol
    adressId: string
    sizeId: string
}