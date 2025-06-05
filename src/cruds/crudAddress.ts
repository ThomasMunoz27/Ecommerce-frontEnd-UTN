import axios from "axios";
import { BASE_URL } from "../utils/constantes";

import { IAdress } from "../types/IAdress";
import { errorAlert } from "../utils/errorAlert";


const URL_ADRESS = `${BASE_URL}/api/adress`

export const getAllAdress = async (): Promise<IAdress[]> => {
    try {
        const response = await axios.get(URL_ADRESS)
        return response.data
    } catch (error) {
        console.log('Error en getAllAdress', error);
        return []   
    }
}
export const getAdressById = async (adressId: string): Promise<IAdress | undefined> => {
    try{
        const response = await axios.get(`${URL_ADRESS}/${adressId}`)
        return response.data
    }catch (err){
        console.log("Error en getAdressById" + err)
        errorAlert('Error', 'No se pudo traer la direccion')
        return undefined
    }
}

export const postAdress = async (newAdress: IAdress) => {
    try{
        const response = await axios.post(URL_ADRESS, newAdress)
        return response.data
    }catch (err){
        console.log("Error en postAdress" + err)
        errorAlert('Error', 'No se pudo crear la direccion')
    }
}

export const putAdress = async (updatedAdress: IAdress) => {
    try{
        const response = await axios.put(`${URL_ADRESS}/${updatedAdress.id}`, updatedAdress)
        return response.data
    }catch (err){
        console.log("Error en putAdress" + err)
        errorAlert('Error', 'No se puede actualizar la direccion')
    }
}

export const deleteAdress = async (idAdressToDelete: string) => {
    try{
        const response = await axios.delete(`${URL_ADRESS}/${idAdressToDelete}`)
        return response.data
    }catch (err){
        console.log("Error en deleteAdress" + err)
        errorAlert('Error','No se pudo eliminar la direccion')
    }
}

