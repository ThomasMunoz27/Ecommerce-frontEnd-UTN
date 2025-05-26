import { IBill } from "./IBIll"
import { IProduct } from "./IProduct"

export interface IBIllDetail{
    id?: number
    product: IProduct
    quantity: number
    unitPrice: number
    subtotal: number
    bill?: IBill
}