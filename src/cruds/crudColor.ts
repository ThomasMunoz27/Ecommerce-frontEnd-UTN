import axios from "axios"
import { BASE_URL } from "../utils/constantes"
import { IColor } from "../types/IColor"




const URL_COLORS = `${BASE_URL}/api/color`


export const getAllColors = async (): Promise<IColor[]> => {
    try{
        const response = await axios.get(URL_COLORS)
        return response.data
    }catch (err){
        console.log("Error en getAllColors" + err)
        return []
    }
}

export const getColorById = async (colorId: string): Promise<IColor | undefined> => {
    try{
        const response = await axios.get(`${URL_COLORS}/${colorId}`)
        return response.data
    }catch (err){
        console.log("Error en getColorById" + err)
        return undefined
    }
}

export const postColor = async (newColor: IColor) => {
    try{
        const response = await axios.post(URL_COLORS, newColor)
        return response.data
    }catch (err){
        console.log("Error en postColor" + err)
    }
}

export const putColor = async (updatedColor: IColor) => {
    try{
        const response = await axios.put(`${URL_COLORS}/${updatedColor.id}`, updatedColor)
        return response.data
    }catch (err){
        console.log("Error en putPrice" + err)
    }
}

export const deleteColor = async (idColorToDelete: string) => {
    try{
        const response = await axios.delete(`${URL_COLORS}/${idColorToDelete}`)
        return response.data
    }catch (err){
        console.log("Error en deleteColor" + err)
    }
}

