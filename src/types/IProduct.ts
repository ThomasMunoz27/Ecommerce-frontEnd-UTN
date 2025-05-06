import { ProductType } from "./enums/ProductType";
import { ICategory } from "./ICategory";
import { IImage } from "./IImage";
import { IPrice } from "./IPrice";


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
    productType: ProductType;
    sex: string;
    prices: IPrice
    image: IImage
    category: ICategory
  }
  