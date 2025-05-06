import { IUser } from "./IUser";

export interface IBill{
    id: string,
    total: number,
    date: string,
    user: IUser
}