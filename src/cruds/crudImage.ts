import { IImage } from "../types/IImage";
import interceptorApiClient from "../interceptors/axios.interceptor";
import axios from "axios";
import { BASE_URL } from "../utils/constantes";

const BASE_CLOUDINARY = `${BASE_URL}/upload` 

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
        const response = await interceptorApiClient.delete(`/image/${idImageToDelete}`)
        return response.data
}

export const postImageToCloudinary = async(image : File) => {
        const response = await axios.post(BASE_CLOUDINARY, image)
        return response.data
}

