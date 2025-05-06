import { ILocality } from "./ILocality";

export interface IAdress {
    id: number,
    street: string,
    number: number,
    cp: number,
    locality: ILocality
}