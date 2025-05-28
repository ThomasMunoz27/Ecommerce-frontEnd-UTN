import { IDiscount } from "./IDiscount";

export interface IPrice {
    id?: number,
    purchasePrice: number,
    salePrice: number,
    discount?: IDiscount | null
}