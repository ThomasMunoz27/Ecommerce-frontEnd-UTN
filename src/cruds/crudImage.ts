import axios from "axios";
import { BASE_URL } from "../utils/constantes";
import { IImage } from "../types/IImage";


const URL_IMAGES = `${BASE_URL}/api/iamage`

export const getAllImages = async (): Promise<IImage[]> => {
    try{
        const response = await axios.get<[]>(URL_IMAGES)
        return response.data
    }catch (err){
        console.log("Error en getAllImages" + err)
        return []
    }
}


export const getImageById = async (imageId: string): Promise<IImage | undefined> => {
    try{
        const response = await axios.get(`${URL_IMAGES}/${imageId}`)
        return response.data
    }catch (err){
        console.log("Error en getImageById" + err)
        return undefined
    }
}

export const postImage = async (newImage: IImage) => {
    try{
        const response = await axios.post(URL_IMAGES, newImage)
        return response.data
    }catch (err){
        console.log("Error en postImage" + err)
    }
}

export const putImage = async (updatedImage: IImage) => {
    try{
        const response = await axios.put(`${URL_IMAGES}/${updatedImage.id}`, updatedImage)
        return response.data
    }catch (err){
        console.log("Error en putImage" + err)
    }
}

export const deleteImage = async (idImageToDelete: string) => {
    try{
        const response = await axios.put(`${URL_IMAGES}/${idImageToDelete}`)
        return response.data
    }catch (err){
        console.log("Error en deleteImage" + err)
    }
}

