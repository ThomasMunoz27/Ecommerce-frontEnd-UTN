import { IUser } from "./IUser";

export interface IBill{
    id: number,
    total: number,
    date: string,
    user?: IUser

    // Datos de comprador anónimo (solo se llenan si no hay user registrado)
	buyerName?: string;
	buyerDni?: string;
	buyerAddress?: string;
}