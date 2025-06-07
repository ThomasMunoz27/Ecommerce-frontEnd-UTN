import axios from "axios";
import { errorAlert } from "../utils/errorAlert";
import { succesAlert } from "../utils/succesAlert";
import { useStoreLogin } from "../store/useStoreLogin";


export const login = async (user: string, pass: string, setToken: (token: string) => void) => {

    const userRequest = {
        username: user,
        password: pass
    }
    try {
        const response = await axios.post(`http://localhost:9000/auth/login`, userRequest)
        setToken(response.data.token)
        succesAlert('Sesion Iniciada.', 'Sesion iniciada con exito.')
    } catch (error) {
        errorAlert('Error', 'Credenciales invalidas')
    }

}



export const register = async () => {

}