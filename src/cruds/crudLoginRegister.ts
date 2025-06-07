import axios from "axios";
import { BASE_URL } from "../utils/constantes";
import { errorAlert } from "../utils/errorAlert";


export const login = async (user: string, pass: string) => {
    const userRequest = {
        name: user,
        password: pass
    }
    try {
        const response = await axios.post(`http://localhost:9000/auth/login`, userRequest)
        console.log('EXITO')
    } catch (error) {
        errorAlert('Error', 'Error al logear')
    }

}



export const register = async () => {

}