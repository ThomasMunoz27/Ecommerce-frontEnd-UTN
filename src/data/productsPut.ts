import axios from "axios"
import { IProduct } from "../types/IProduct"
import { BASE_URL } from "../utils/constantes"

const URL_PRODUCTS = `${BASE_URL}/api/product`

export const putProduct = async (products: IProduct[]) => {
    try{
        const response = await axios.put<IProduct[]>(URL_PRODUCTS, {products})
        return response.data
    }catch(error){
        console.log("Error en putProduct" + error)
    }
}