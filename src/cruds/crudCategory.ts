import axios from "axios"
import { ICategory } from "../types/ICategory"
import { BASE_URL } from "../utils/constantes"
import interceptorApiClient from "../interceptors/axios.interceptor"


const URL_CATEGORIES = `${BASE_URL}/api/category`

export const getAllCategories = async (): Promise<ICategory[]> => {
    const response = await interceptorApiClient.get("/category")
    return response.data
}

export const getCategoryById = async (categoryId: string): Promise<ICategory | undefined> => {
    const response = await interceptorApiClient.get(`/category/${categoryId}`)
    return response.data
}

export const getCategoryByName = async (categoryName: string): Promise<ICategory | undefined> => {
   try{
        const response = await axios.get(`${URL_CATEGORIES}/search?name=${categoryName}`)
        return response.data
    }catch (err){
        console.log("Error en getCategoryByName" + err)
        return undefined
    }
}

export const postCategory = async (newCategory: ICategory) => {
    const response = await interceptorApiClient.post(`/category`, newCategory)
    return response.data
}

export const putCategory = async (updatedCategory: ICategory) => {
    const response = await interceptorApiClient.put(`/category/${updatedCategory.id}`, updatedCategory)
    return response.data
}

export const deleteCategory = async (idCategoryToDelete: number) => {
    const response = await interceptorApiClient.delete(`/category/${idCategoryToDelete}`)
    return response.data
}

