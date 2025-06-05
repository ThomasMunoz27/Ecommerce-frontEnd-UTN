import axios from "axios"
import { IDiscount } from "../types/IDiscount"
import { BASE_URL } from "../utils/constantes"
import interceptorApiClient from "../interceptors/axios.interceptor"


const URL_DISCOUNT = `${BASE_URL}/api/discount`


export const getAllDiscounts = async (): Promise<IDiscount[]> => {
        const response = await interceptorApiClient.get('/discount')
        return response.data
}

export const getDiscountById = async (discountId: string): Promise<IDiscount | undefined> => {
        const response = await interceptorApiClient.get(`/discount/${discountId}`)
        return response.data
}

export const postDiscount = async (newDiscount: IDiscount) => {
        const response = await interceptorApiClient.post('/discount', newDiscount)
        return response.data
}

export const putDiscount = async (updateDiscount: IDiscount) => {
        const response = await interceptorApiClient.put(`/discount/${updateDiscount.id}`, updateDiscount)
        return response.data
   
}

export const deleteDiscount = async (idDiscountToDelete: string) => {
        const response = await interceptorApiClient.delete(`/discount/${idDiscountToDelete}`)
        return response.data
}

