import interceptorApiClient from "../interceptors/axios.interceptor"
import { IColor } from "../types/IColor"


export const getAllColors = async (): Promise<IColor[]> => {
        const response = await interceptorApiClient.get('/color')
        return response.data
}

export const getColorById = async (colorId: string): Promise<IColor | undefined> => {
        const response = await interceptorApiClient.get(`/color/${colorId}`)
        return response.data
}

export const postColor = async (newColor: IColor) => {
        const response = await interceptorApiClient.post('/color', newColor)
        return response.data
}

export const putColor = async (updatedColor: IColor) => {
        const response = await interceptorApiClient.put(`/color/${updatedColor.id}`, updatedColor)
        return response.data
}

export const deleteColor = async (idColorToDelete: string) => {
        const response = await interceptorApiClient.delete(`/color/${idColorToDelete}`)
        return response.data
}

