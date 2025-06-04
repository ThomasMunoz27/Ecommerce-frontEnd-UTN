
import { IPrice } from "../types/IPrice"
import interceptorApiClient from "../interceptors/axios.interceptor"




export const getAllPrices = async (): Promise<IPrice[]> => {
        const response = await interceptorApiClient.get('/prices')
        return response.data
}

export const getPriceById = async (priceId: string): Promise<IPrice | undefined> => {

        const response = await interceptorApiClient.get(`/prices/${priceId}`)
        return response.data

}

export const postPrice = async (newPrice: IPrice) => {
    
        const response = await interceptorApiClient.post('/prices', newPrice)
        return response.data
   
}

export const putPrice = async (updatedPrice: IPrice) => {
        const response = await interceptorApiClient.put(`/prices/${updatedPrice.id}`, updatedPrice)
        return response.data
}

export const deletePrice = async (idPriceToDelete: string) => {
        const response = await interceptorApiClient.delete(`/prices/${idPriceToDelete}`)
        return response.data
}

