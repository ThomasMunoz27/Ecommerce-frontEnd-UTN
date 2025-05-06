import { IUser } from "./IUser";

export interface IBill{
    id: number,
    total: number,
    date: string,
    user: IUser
}