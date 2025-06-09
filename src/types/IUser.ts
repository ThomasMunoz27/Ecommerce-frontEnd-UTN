import { Rol } from "./enums/Rol"
import { IAdress, IAdressRequest } from "./IAdress"
import { ISize } from "./ISize"

export interface IUser {
    id: number
    name: string,
    lastname: string
    username: string,
    password: string,
    birthdate : Date,
    phoneNumber: number,
    user: Rol,
    email: string,
    dni: string
    adress: IAdress
    size: ISize
    active: boolean,
    sex : string
}

export interface IUserRequest {
    id?: number
    name: string,
    lastname: string
    username: string,
    password: string,
    birthdate : Date,
    phoneNumber: number,
    user: Rol,
    email: string,
    dni: string
    adress: IAdressRequest // Para crear
    size: {id : number}
    active: boolean,
    sex : string
}