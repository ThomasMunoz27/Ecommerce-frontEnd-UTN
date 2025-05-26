import axios from "axios";
import { ISize } from "../types/ISize";
import { BASE_URL } from "../utils/constantes";


const URL_SIZES = `${BASE_URL}/api/size`

export const getAllSizes = async (): Promise<ISize[]> => {
    try {
        const response = await axios.get(URL_SIZES)
        return response.data
    } catch (error) {
        console.log('Error en getAllSizes', error);
        return []   
    }
}
export const getSizeById = async (sizeId: string): Promise<ISize | undefined> => {
    try{
        const response = await axios.get(`${URL_SIZES}/${sizeId}`)
        return response.data
    }catch (err){
        console.log("Error en getSizeById" + err)
        return undefined
    }
}

export const postSize = async (newSize: ISize) => {
    try{
        const response = await axios.post(URL_SIZES, newSize)
        return response.data
    }catch (err){
        console.log("Error en postSize" + err)
    }
}

export const putSize = async (updatedSize: ISize) => {
    try{
        const response = await axios.put(`${URL_SIZES}/${updatedSize.id}`, updatedSize)
        return response.data
    }catch (err){
        console.log("Error en putSize" + err)
    }
}

export const deleteSize = async (idSizeToDelete: string) => {
    try{
        const response = await axios.delete(`${URL_SIZES}/${idSizeToDelete}`)
        return response.data
    }catch (err){
        console.log("Error en deleteSize" + err)
    }
}

