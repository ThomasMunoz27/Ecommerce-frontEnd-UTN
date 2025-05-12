import axios from "axios"
import { IUser } from "../types/IUser"
import { BASE_URL } from "../utils/constantes"

const URL_USERS = `${BASE_URL}/api/user`

export const getAllUsers = async (): Promise<IUser[]> => {
    try{
        const response = await axios.get(URL_USERS)
        return response.data
    }catch (err){
        console.log("Error en getAllCategories" + err)
        return []
    }
}