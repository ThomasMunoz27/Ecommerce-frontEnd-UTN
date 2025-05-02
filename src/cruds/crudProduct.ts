import axios from "axios"
import { BASE_URL } from "../utils/constantes"


const URL_PRODUCTS = `${BASE_URL}/api/product`

export const getAllProucts = async () => {
    try{
        const response = await axios.get(URL_PRODUCTS)
        return response.data
    }catch (err) {
        console.log("Error en getAllProducts" + err)
    }
}