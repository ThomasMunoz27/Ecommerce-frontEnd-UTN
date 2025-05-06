import { Rol } from "./enums/Rol"
import { IAdress } from "./IAdress"
import { ISize } from "./ISize"

export interface IUser {
    id: number
    name: string,
    password: string,
    user: Rol
    email: string,
    dni: string
    adress: IAdress
    size: ISize
}