import { ICountry } from "./ICountry";

export interface IProvince {
    id: string,
    name: string,
    country: ICountry
}