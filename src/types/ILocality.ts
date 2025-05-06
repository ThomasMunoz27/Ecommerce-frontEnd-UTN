import { IProvince } from "./IProvince";

export interface ILocality {
    id: number,
    name: string,
    province: IProvince
}