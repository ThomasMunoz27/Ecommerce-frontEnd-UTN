import { ILocality } from "./ILocality";

export interface IAdress {
    id: string,
    street: string,
    number: number,
    cp: number,
    locality: ILocality
}