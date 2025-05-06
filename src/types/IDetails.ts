import { IImage } from "./IImage";
import { IPrice } from "./IPrice";

export interface IDetails{
    id: number,
    size: string,
    stock: number,
    color: string,
    state: boolean,
    price: IPrice,
    imagesId: IImage[]
}