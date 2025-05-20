import axios from "axios"
import { BASE_URL } from "../utils/constantes"
import { ICountry } from "../types/ICountry"


const URL_COUNTRY = `${BASE_URL}/api/country`


export const getAllCountries = async (): Promise<ICountry[]> => {
    try{
        const response = await axios.get(URL_COUNTRY)
        return response.data
    }catch (err){
        console.log("Error en getAllCountries" + err)
        return []
    }
}

export const getCountryById = async (countryId: string): Promise<ICountry | undefined> => {
    try{
        const response = await axios.get(`${URL_COUNTRY}/${countryId}`)
        return response.data
    }catch (err){
        console.log("Error en getCategoryById" + err)
        return undefined
    }
}


export const postCountry = async (newCountry: ICountry) => {
    try{
        const response = await axios.post(URL_COUNTRY, newCountry)
        return response.data
    }catch (err){
        console.log("Error en postCategory" + err)
    }
}

export const putCategory = async (updatedCountry: ICountry) => {
    try{
        const response = await axios.put(`${URL_COUNTRY}/${updatedCountry.id}`, updatedCountry)
        return response.data
    }catch (err){
        console.log("Error en putCategory" + err)
    }
}

export const deleteCategory = async (idCountryToDelete: string) => {
    try{
        const response = await axios.delete(`${URL_COUNTRY}/${idCountryToDelete}`)
        return response.data
    }catch (err){
        console.log("Error en deleteCategory" + err)
    }
}

