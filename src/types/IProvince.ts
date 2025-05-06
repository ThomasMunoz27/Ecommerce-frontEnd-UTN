import { ICountry } from "./ICountry";

export interface IProvince {
    id: number,
    name: string,
    country: ICountry
}