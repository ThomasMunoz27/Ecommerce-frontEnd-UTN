import axios from "axios";
import { BASE_URL } from "../utils/constantes";
import { IImage } from "../types/IImage";
import { errorAlert } from "../utils/errorAlert";
import interceptorApiClient from "../interceptors/axios.interceptor";


const URL_IMAGES = `${BASE_URL}/api/image`

export const getAllImages = async (): Promise<IImage[]> => {
        const response = await interceptorApiClient.get<[]>('/image')
        return response.data
}


export const getImageById = async (imageId: string): Promise<IImage | undefined> => {
        const response = await interceptorApiClient.get(`/image/${imageId}`)
        return response.data
}

export const postImage = async (newImage: IImage) => {
        const response = await interceptorApiClient.post('/image', newImage)
        return response.data

}

export const putImage = async (updatedImage: IImage) => {
        const response = await interceptorApiClient.put(`/image/${updatedImage.id}`, updatedImage)
        return response.data
}

export const deleteImage = async (idImageToDelete: string) => {
        const response = await interceptorApiClient.put(`/image/${idImageToDelete}`)
        return response.data
}

