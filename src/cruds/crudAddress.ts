import { IAdress, IAdressRequest } from "../types/IAdress";
import interceptorApiClient from "../interceptors/axios.interceptor";



export const getAllAdress = async() : Promise<IAdress[]> => {
    const response = await interceptorApiClient.get(`/adress`)
    return response.data
}

export const getAdressById = async (adressId: string): Promise<IAdress | undefined> => {
        const response = await interceptorApiClient.get(`adress/${adressId}`)
        return response.data
    
}

export const postAdress = async (newAdress: IAdress | IAdressRequest) => {
        const response = await interceptorApiClient.post("/adress", newAdress)
        return response.data
    
}

export const putAdress = async (updatedAdress: IAdress | IAdressRequest) => {
        const response = await interceptorApiClient.put(`adress/${updatedAdress.id}`, updatedAdress)
        return response.data
}

export const deleteAdress = async (idAdressToDelete: string) => {
        const response = await interceptorApiClient.delete(`adress/${idAdressToDelete}`)
        return response.data
}

