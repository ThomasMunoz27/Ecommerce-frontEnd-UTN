import axios from "axios"
import { ICategory } from "../types/ICategory"
import { BASE_URL } from "../utils/constantes"


const URL_CATEGORIES = `${BASE_URL}/api/category`


export const getAllCategories = async (): Promise<ICategory[]> => {
    try{
        const response = await axios.get(URL_CATEGORIES)
        return response.data
    }catch (err){
        console.log("Error en getAllCategories" + err)
        return []
    }
}

export const getCategoryById = async (categoryId: string): Promise<ICategory | undefined> => {
    try{
        const response = await axios.get(`${URL_CATEGORIES}/${categoryId}`)
        return response.data
    }catch (err){
        console.log("Error en getCategoryById" + err)
        return undefined
    }
}

export const postCategory = async (newCategory: ICategory) => {
    try{
        const response = await axios.post(URL_CATEGORIES, newCategory)
        return response.data
    }catch (err){
        console.log("Error en postCategory" + err)
    }
}

export const putCategory = async (updatedCategory: ICategory) => {
    try{
        const response = await axios.put(`${URL_CATEGORIES}/${updatedCategory.id}`, updatedCategory)
        return response.data
    }catch (err){
        console.log("Error en putCategory" + err)
    }
}

export const deleteCategory = async (idCategoryToDelete: string) => {
    try{
        const response = await axios.delete(`${URL_CATEGORIES}/${idCategoryToDelete}`)
        return response.data
    }catch (err){
        console.log("Error en deleteCategory" + err)
    }
}

