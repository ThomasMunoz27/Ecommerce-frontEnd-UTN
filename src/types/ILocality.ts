import { IProvince } from "./IProvince";

export interface ILocality {
    id: string,
    name: string,
    province: IProvince
}