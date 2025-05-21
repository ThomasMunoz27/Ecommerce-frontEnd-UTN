import { ProductType } from "./enums/ProductType";
import { ICategory } from "./ICategory";
import { IColor } from "./IColor";
import { IImage } from "./IImage";
import { IPrice } from "./IPrice";
import { ISize } from "./ISize";


// export interface IProduct {
//     id: string;
//     name: string;
//     sex: string;
//     productType: ProductType
//     categoryId: string
//     priceId: string
//     imageId: string
// }

// Correción IProduct

export interface IProduct {
    id: number;
    name: string;
    description: String
    productType: ProductType;
    sex: string;
    prices: IPrice
    image: IImage
    category: ICategory
    sizes : ISize[]
    colors : IColor[]
    stock : number
  }
  