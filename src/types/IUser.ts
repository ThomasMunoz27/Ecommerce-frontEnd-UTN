import { Rol } from "./enums/Rol"
import { IAdress } from "./IAdress"
import { ISize } from "./ISize"

export interface IUser {
    id: number
    name: string,
    lastname: string
    username: String,
    password: string,
    birthdate : Date,
    phoneNumber: number,
    user: Rol,
    email: string,
    dni: string
    adress: IAdress
    size: ISize
    active: boolean
}