import { IProvince } from "./IProvince";

export interface ILocality {
    id: number,
    name: string,
    province: IProvince
}

export interface ILocalityRequest {
    id: number | null,
    name: string,
    province: {id : number}
}