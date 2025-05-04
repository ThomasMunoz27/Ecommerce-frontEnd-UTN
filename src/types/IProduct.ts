import { ProductType } from "./enums/ProductType";


export interface IProduct {
    id: string;
    name: string;
    sex: string;
    productType: ProductType
    categoryId: string
    priceId: string
    imageId: string
}