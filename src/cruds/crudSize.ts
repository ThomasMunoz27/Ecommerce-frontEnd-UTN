import interceptorApiClient from "../interceptors/axios.interceptor"
import { ISize } from "../types/ISize";



export const getAllSizes = async (): Promise<ISize[]> => {
        const response = await interceptorApiClient.get('/size')
        return response.data
}
export const getSizeById = async (sizeId: string): Promise<ISize | undefined> => {
        const response = await interceptorApiClient.get(`/size/${sizeId}`)
        return response.data
}

export const postSize = async (newSize: ISize) => {
        const response = await interceptorApiClient.post('/size', newSize)
        return response.data
}

export const putSize = async (updatedSize: ISize) => {
        const response = await interceptorApiClient.put(`/size/${updatedSize.id}`, updatedSize)
        return response.data
}

export const deleteSize = async (idSizeToDelete: string) => {
        const response = await interceptorApiClient.delete(`/size/${idSizeToDelete}`)
        return response.data
    }

