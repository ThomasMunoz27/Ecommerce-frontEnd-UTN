import { IColor } from "./IColor";
import { IProduct } from "./IProduct";
import { ISize } from "./ISize";

export interface ICartProduct extends IProduct {
    quantity: number,
    size: ISize,
    color: IColor
}