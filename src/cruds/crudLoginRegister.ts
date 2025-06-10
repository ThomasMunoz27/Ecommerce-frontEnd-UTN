import axios from "axios";
import { errorAlert } from "../utils/errorAlert";
import { succesAlert } from "../utils/succesAlert";



export const login = async (user: string, pass: string, setToken: (token: string) => void) => {

    const userRequest = {
        username: user,
        password: pass
    }
    try {
        const response = await axios.post(`http://localhost:9000/auth/login`, userRequest)
        setToken(response.data.token)
        console.log(response.data.token)
        succesAlert('Sesion Iniciada.', 'Sesion iniciada con exito.')
    } catch (error) {
        errorAlert('Error', 'Credenciales invalidas')
    }

}


export const register = async (
  name: string,
  password: string,
  email: string,
  dni: string,
  username: string,
  birthdate: string,
  lastname: string,
  phoneNumber: number,
  sex: string,

) => {
  const registerRequest = {
    name,
    password,
    user: 0,
    email,
    dni,
    username,
    birthdate,
    lastname,
    phoneNumber,
    sex,
    adressId: 1,
    sizeId: 1
  };

  try {
      console.log(registerRequest)
      const response = await axios.post(`http://localhost:9000/auth/register`, registerRequest)
      console.log(response.data.id)
      succesAlert('Registro exitoso', 'Usuario registrado con exito')
    
  } catch (error){
    errorAlert('Error', 'Error al registrar usuario')
  }
};
