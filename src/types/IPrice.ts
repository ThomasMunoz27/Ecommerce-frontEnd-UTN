import { IDiscount } from "./IDiscount";

export interface IPrice {
    id: string,
    purchasePrice: number,
    salePrice: number,
    discount: IDiscount
}