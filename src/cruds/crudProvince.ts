import { IProvince, IProvinceRequest } from "../types/IProvince"
import interceptorApiClient from "../interceptors/axios.interceptor"


export const getAllProvinces = async (): Promise<IProvince[]> => {
    const response = await interceptorApiClient.get(`/province`)
    return response.data
}

export const getProvinceById = async (provinceId: string): Promise<IProvince | undefined> => {
    const response = await interceptorApiClient.get(`/province/${provinceId}`)
    return response.data
}

export const getProvincesByCountryId = async (countryId: string): Promise<IProvince[]> => {
    const response = await interceptorApiClient.get(`/province/by-country/${countryId}`)
    return response.data
    
}

export const postProvince = async (newProvince: IProvince | IProvinceRequest) => {
    const response = await interceptorApiClient.post(`/province`, newProvince)
    return response.data
}

export const putProvince = async (updatedProvince: IProvince | IProvinceRequest) => {
    const response = await interceptorApiClient.put(`/province/${updatedProvince.id}`, updatedProvince)
    return response.data
}

export const deleteProvince = async (provinceIdToDelete: string) => {
    const response = await interceptorApiClient.delete(`/province/${provinceIdToDelete}`)
    return response.data
}
