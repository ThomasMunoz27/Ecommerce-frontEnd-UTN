import { ICountry } from "../types/ICountry"
import interceptorApiClient from "../interceptors/axios.interceptor"




export const getAllCountries = async (): Promise<ICountry[]> => {
    const response = await interceptorApiClient.get(`/country`)
    return response.data
}

export const getCountryById = async (countryId: string): Promise<ICountry | undefined> => {
    const response = await interceptorApiClient.get(`/country/${countryId}`)
    return response.data
}


export const postCountry = async (newCountry: ICountry) => {
    const response = await interceptorApiClient.post(`/country`, newCountry)
    return response.data
}

export const putCategory = async (updatedCountry: ICountry) => {
    const response = await interceptorApiClient.put(`/country/${updatedCountry.id}`, updatedCountry)
    return response.data
}

export const deleteCategory = async (idCountryToDelete: string) => {
    const response = await interceptorApiClient.delete(`/country/${idCountryToDelete}`)
    return response.data
}

