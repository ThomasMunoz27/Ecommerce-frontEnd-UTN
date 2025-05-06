import { ProductType } from "./enums/ProductType";


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
    productType: string;
    sex: string;
  
    category: {
      id: number;
      name: string;
    };
  
    prices: {
      id: number;
      purchasePrice: number;
      salePrice: number;
      discount?: {
        id: number;
        name: string;
        discountDescription: string;
        promotionalPrice: number;
        dateFrom: string;
        dateTo: string;
        timeFrom: string;
        timeTo: string;
      };
    };
  
    image: {
      id: number;
      url: string;
    };
  }
  