import { IColor } from "./IColor";
import { IPrice } from "./IPrice";
import { ISize } from "./ISize";

export interface ICreateProduct {
    name: string;
    description: string
    productTypeId: number
    sex: string;
    prices: number
    imageId: number
    categoryId: number
    sizes : ISize[]
    colors : IColor[]
    stock : number
    active: boolean
    }