import axios from "axios"
import { IUser } from "../types/IUser"
import { BASE_URL } from "../utils/constantes"

const URL_USERS = `${BASE_URL}/api/user`

export const getAllUsers = async (): Promise<IUser[]> => {
    try{
        const response = await axios.get(URL_USERS)
        return response.data
    }catch (err){
        console.log("Error en getAllUsers" + err)
        return []
    }
}

export const getUserById = async (idUser : number): Promise<IUser[]> => {
    try{
        const response = await axios.get(`${BASE_URL}/${idUser}`)
        return response.data
    }catch (err){
        console.log("Error en getUserById" + err)
        return []
    }
}

export const createUser = async (newUser : IUser): Promise<IUser[]> => {
    try{
        const response = await axios.post(BASE_URL, newUser)
        return response.data
    }catch (err){
        console.log("Error en createUser" + err)
        return []
    }
}

export const updateUser = async ( userUpdated : IUser): Promise<IUser[]> => {
    try{
        const response = await axios.put(`${BASE_URL}/${userUpdated.id}`, userUpdated)
        return response.data
    }catch (err){
        console.log("Error en updateUser" + err)
        return []
    }
}

export const deleteUser = async (idUser : number): Promise<IUser[]> => {
    try{
        const response = await axios.delete(`${URL_USERS}/${idUser}`)
        return response.data
    }catch (err){
        console.log("Error en getAllCategories" + err)
        return []
    }
}

export const getAllUsersActive = async () => {
    try{
        const response = await axios.get(`${URL_USERS}/active`)
        return response.data
    }catch (error){
        console.log("Error en getAllUsersActive" + error)
    }
}