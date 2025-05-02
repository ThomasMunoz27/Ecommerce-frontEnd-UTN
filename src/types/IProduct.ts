import { ProductType } from "./enums/ProductType";
import { ICategory } from "./ICategory";
import { IPrice } from "./IPrice";

export interface IProduct {
    id: string;
    name: string;
    sex: string;
    productType: ProductType
    category: ICategory
    price: IPrice
}