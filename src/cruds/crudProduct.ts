import axios from "axios"
import { BASE_URL } from "../utils/constantes"
import { IProduct } from "../types/IProduct"



const URL_PRODUCTS = `${BASE_URL}/api/product`

export const getAllProducts = async (): Promise<IProduct[]> => {
    try{
        const response = await axios.get<[]>(URL_PRODUCTS)
        return response.data
    }catch (err) {
        console.log("Error en getAllProducts" + err)
        return []
    }
}

export const getProductById = async (idProduct: string) => {
    try{
        const response = await axios.get(`${URL_PRODUCTS}/${idProduct}`)
        return response.data
    }catch (err){
        console.log("Error en getProductById" + err)
    }
}


export const postProduct = async (newProduct: IProduct) => {
    try{
        const response = await axios.post(URL_PRODUCTS, newProduct)
        return response.data
    }catch (err){
        console.log("Error en postProduct" + err)
    }
}

export const putProduct = async (updatedProduct: IProduct) => {
    try{
        const response = await axios.put(`${URL_PRODUCTS}/${updatedProduct.id}`, updatedProduct)
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