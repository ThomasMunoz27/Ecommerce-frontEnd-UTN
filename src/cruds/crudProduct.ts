import axios from "axios"
import interceptorApiClient from "../interceptors/axios.interceptor"
import { BASE_URL } from "../utils/constantes"
import { IProduct } from "../types/IProduct"
import { ICreateProduct } from "../types/ICreatedProducts"
import { errorAlert } from "../utils/errorAlert"




const URL_PRODUCTS = `${BASE_URL}/api/product`

export const getAllProducts = async (): Promise<IProduct[]> => {
        const response = await interceptorApiClient.get("/product")
        return response.data
}

export const getProductById = async (idProduct: string) => {
    const response = await interceptorApiClient.get(`/product${idProduct}`)
    return response.data
}


export const postProduct = async (newProduct: ICreateProduct) => {
   
        const response = await interceptorApiClient.post('/product', newProduct)
        return response.data
    
}

export const putProduct = async (updatedProduct: IProduct) => {
    try{
        const response = await interceptorApiClient.post(`product/${updatedProduct.id}`, updatedProduct)
        return response.data

    }catch (err){
        console.log("Error en putProductCrud" + err)
    }
}

export const deleteProduct = async (idProductToDelete: number) => {
    try{

        const response = await axios.delete(`${URL_PRODUCTS}/${idProductToDelete}`)
        return response.data

    }catch (err){
        console.log("Error en deleteProduct" + err)
    }
}

export const getAllProductsActive = async () => {
    try{
        const response = await axios.get(`${URL_PRODUCTS}/active`)
        return response.data
    }catch (error){
        console.log("Error en getAllProductsActive" + error)
    }
}

export const getAllProductsInactive = async () => {
    try{
        const response = await axios.get(`${URL_PRODUCTS}/inactive`)
        return response.data
    }catch (error){
        console.log("Error en getAllProductsActive" + error)
    }
}


export const getAllProductsPaged = async (page: number, size: number, categoryId? : number) => {
    try {
        if(categoryId){
            const response = await axios.get(`${URL_PRODUCTS}/paged?page=${page}&size=${size}&categoryId=${categoryId}`)
            return response.data

        }else{
            const response = await axios.get(`${URL_PRODUCTS}/paged?page=${page}&size=${size}`)
            return response.data
        }
    } catch (error) {
        console.error('Error en getAllProductsPaged', error);
        
    }
}

export const getProductsFiltered = async (category: string) => {
    try {
        const response = await axios.get(`${URL_PRODUCTS}/filter?categoria=${category}`)
        return response.data
    } catch (error) {
        console.error('Error en getProductsFiltered', error)
    }
}