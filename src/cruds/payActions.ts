import axios from "axios"
import { BASE_URL } from "../utils/constantes"

const PAY_URL = `${BASE_URL}/api/payments/create-preference`



export const goToPay =  async (cartItems: any) => {

    try{
        const response = await axios.post(PAY_URL, cartItems)
        const prefId = response.data.preferenceId
        return prefId

    }catch(err:any){
        console.log("Error en goToPay: " + err.response.data)
    }
}