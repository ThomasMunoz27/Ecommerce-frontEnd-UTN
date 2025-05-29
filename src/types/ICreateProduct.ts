
export interface ICreateProduct {
    id? : number
    name: string;
    description: string
    productTypeId: number
    sex: string;
    prices: number
    imageId: number
    categoryId: number
    sizes : string[]
    colors : string[]
    stock : number
    active: boolean
    }