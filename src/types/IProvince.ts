import { ICountry } from "./ICountry";

export interface IProvince {
    id: number,
    name: string,
    country: ICountry
}

export interface IProvinceRequest {
    id : number | null,
    name : string,
    country : {id : number}
}