import { ILocality } from "../types/ILocality"
import interceptorApiClient from "../interceptors/axios.interceptor"


export const getAllLocalities = async (): Promise<ILocality[]> => {
	const response = await interceptorApiClient.get(`/locality`)
	return response.data

}

export const getLocalityById = async (localityId: string): Promise<ILocality | undefined> => {
	const response = await interceptorApiClient.get(`/locality/${localityId}`)
	return response.data

}

export const getLocalitiesByProvinceId = async (provinceId: string): Promise<ILocality[]> => {
	const response = await interceptorApiClient.get(`/locality/by-province/${provinceId}`)
    return response.data
}


export const postLocality = async (newLocality: ILocality) => {
	const response = await interceptorApiClient.post(`/locality`, newLocality)
	return response.data
}

export const putLocality = async (updatedLocality: ILocality) => {
	const response = await interceptorApiClient.put(`/locality/${updatedLocality.id}`, updatedLocality)
	return response.data
}

export const deleteLocality = async (localityIdToDelete: string) => {
	const response = await interceptorApiClient.delete(`locality/${localityIdToDelete}`)
	return response.data
}
