import { ProductType } from "./enums/ProductType";

export interface ICreateProduct {
    name: string;
    description: string;
    productType: ProductType;
    sex: string;
    stock: number;
    active: boolean;
    image: { id: number };
    prices: { id: number };
    colors: { id: number | undefined }[];
    sizes: { id: number | undefined | string }[];
    category: { id: number }[];
}