import axios from "axios"
import { IProvince } from "../types/IProvince"
import { BASE_URL } from "../utils/constantes"

const URL_PROVINCES = `${BASE_URL}/api/province`

export const getAllProvinces = async (): Promise<IProvince[]> => {
    try {
    const response = await axios.get(URL_PROVINCES)
    return response.data
    } catch (err) {
    console.log("Error en getAllProvinces: " + err)
    return []
    }
}

export const getProvinceById = async (provinceId: string): Promise<IProvince | undefined> => {
    try {
    const response = await axios.get(`${URL_PROVINCES}/${provinceId}`)
    return response.data
        } catch (err) {
    console.log("Error en getProvinceById: " + err)
    return undefined
    }
}

export const getProvincesByCountryId = async (countryId: string): Promise<IProvince[]> => {
    try{
        const response = await axios.get(`${URL_PROVINCES}/by-country/${countryId}`)
        return response.data
    } catch (err) {
        console.log("Error en getProvincesByCountryId: " + err)
        return []
    }
}


export const postProvince = async (newProvince: IProvince) => {
    try {
    const response = await axios.post(URL_PROVINCES, newProvince)
    return response.data
    } catch (err) {
    console.log("Error en postProvince: " + err)
    }
}

export const putProvince = async (updatedProvince: IProvince) => {
    try {
    const response = await axios.put(`${URL_PROVINCES}/${updatedProvince.id}`, updatedProvince)
    return response.data
    } catch (err) {
    console.log("Error en putProvince: " + err)
    }
}

export const deleteProvince = async (provinceIdToDelete: string) => {
    try {
    const response = await axios.delete(`${URL_PROVINCES}/${provinceIdToDelete}`)
    return response.data
    } catch (err) {
    console.log("Error en deleteProvince: " + err)
    }
}
