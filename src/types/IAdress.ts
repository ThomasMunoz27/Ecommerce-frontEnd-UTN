import { ILocality } from "./ILocality";

export interface IAdress {
    id?: number,
    street: string,
    number: number,
    cp: number,
    locality: ILocality 
}

export interface IAdressRequest {
  id?: number | null;
  street: string;
  number: number;
  cp: number;
  locality: {id : number}
}