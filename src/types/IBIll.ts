import { IBIllDetail } from "./IBillDetail";
import { IUser } from "./IUser";

export interface IBill{
    id?: number,
    total: number,
    datePurchase: string,
    user: IUser | null
    details: IBIllDetail[]
    // Datos de comprador anónimo (solo se llenan si no hay user registrado)
	buyerName?: string;
	buyerDni?: string;
	buyerAddress?: string;
    
}