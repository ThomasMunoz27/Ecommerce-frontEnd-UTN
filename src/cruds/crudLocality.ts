import axios from "axios"
import { ILocality } from "../types/ILocality"
import { BASE_URL } from "../utils/constantes"

const URL_LOCALITIES = `${BASE_URL}/api/locality`

export const getAllLocalities = async (): Promise<ILocality[]> => {
	try {
		const response = await axios.get(URL_LOCALITIES)
		return response.data
	} catch (err) {
		console.log("Error en getAllLocalities: " + err)
		return []
	}
}

export const getLocalityById = async (localityId: string): Promise<ILocality | undefined> => {
	try {
		const response = await axios.get(`${URL_LOCALITIES}/${localityId}`)
		return response.data
	} catch (err) {
		console.log("Error en getLocalityById: " + err)
		return undefined
	}
}

export const getLocalitiesByProvinceId = async (provinceId: string): Promise<ILocality[]> => {
    try{
        const response = await axios.get(`${URL_LOCALITIES}/by-province/${provinceId}`)
        return response.data
    } catch (err) {
        console.log("Error en getLocalitiesByProvinceId: " + err)
        return []
    }
}


export const postLocality = async (newLocality: ILocality) => {
	try {
		const response = await axios.post(URL_LOCALITIES, newLocality)
		return response.data
	} catch (err) {
		console.log("Error en postLocality: " + err)
	}
}

export const putLocality = async (updatedLocality: ILocality) => {
	try {
		const response = await axios.put(`${URL_LOCALITIES}/${updatedLocality.id}`, updatedLocality)
		return response.data
	} catch (err) {
		console.log("Error en putLocality: " + err)
	}
}

export const deleteLocality = async (localityIdToDelete: string) => {
	try {
		const response = await axios.delete(`${URL_LOCALITIES}/${localityIdToDelete}`)
		return response.data
	} catch (err) {
		console.log("Error en deleteLocality: " + err)
	}
}
