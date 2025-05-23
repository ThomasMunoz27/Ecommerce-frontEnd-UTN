import axios from "axios"
import { IDiscount } from "../types/IDiscount"
import { BASE_URL } from "../utils/constantes"


const URL_DISCOUNT = `${BASE_URL}/api/discount`


export const getAllDiscounts = async (): Promise<IDiscount[]> => {
    try{
        const response = await axios.get(URL_DISCOUNT)
        return response.data
    }catch (err){
        console.log("Error en getAllDiscounts" + err)
        return []
    }
}

export const getDiscountById = async (discountId: string): Promise<IDiscount | undefined> => {
    try{
        const response = await axios.get(`${URL_DISCOUNT}/${discountId}`)
        return response.data
    }catch (err){
        console.log("Error en getDiscountById" + err)
        return undefined
    }
}

export const postDiscount = async (newDiscount: IDiscount) => {
    try{
        const response = await axios.post(URL_DISCOUNT, newDiscount)
        return response.data
    }catch (err){
        console.log("Error en postDiscount" + err)
    }
}

export const putDiscount = async (updateDiscount: IDiscount) => {
    try{
        const response = await axios.put(`${URL_DISCOUNT}/${updateDiscount.id}`, updateDiscount)
        return response.data
    }catch (err){
        console.log("Error en putDiscount" + err)
    }
}

export const deleteDiscount = async (idDiscountToDelete: string) => {
    try{
        const response = await axios.delete(`${URL_DISCOUNT}/${idDiscountToDelete}`)
        return response.data
    }catch (err){
        console.log("Error en deleteDiscount" + err)
    }
}

