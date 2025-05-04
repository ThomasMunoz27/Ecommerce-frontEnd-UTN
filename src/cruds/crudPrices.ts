import axios from "axios"
import { BASE_URL } from "../utils/constantes"
import { IPrice } from "../types/IPrice"




const URL_PRICES = `${BASE_URL}/api/prices`


export const getAllPrices = async (): Promise<IPrice[]> => {
    try{
        const response = await axios.get(URL_PRICES)
        return response.data
    }catch (err){
        console.log("Error en getAllPrices" + err)
        return []
    }
}

export const getPriceById = async (priceId: string): Promise<IPrice | undefined> => {
    try{
        const response = await axios.get(`${URL_PRICES}/${priceId}`)
        return response.data
    }catch (err){
        console.log("Error en getPriceById" + err)
        return undefined
    }
}

export const postPrice = async (newPrice: IPrice) => {
    try{
        const response = await axios.post(URL_PRICES, newPrice)
        return response.data
    }catch (err){
        console.log("Error en postPrice" + err)
    }
}

export const putPrice = async (updatedPrice: IPrice) => {
    try{
        const response = await axios.put(`${URL_PRICES}/${updatedPrice.id}`, updatedPrice)
        return response.data
    }catch (err){
        console.log("Error en putPrice" + err)
    }
}

export const deletePrice = async (idPriceToDelete: string) => {
    try{
        const response = await axios.delete(`${URL_PRICES}/${idPriceToDelete}`)
        return response.data
    }catch (err){
        console.log("Error en deletePrice" + err)
    }
}

