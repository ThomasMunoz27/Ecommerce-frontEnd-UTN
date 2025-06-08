
import interceptorApiClient from "../interceptors/axios.interceptor"
import { IUser } from "../types/IUser"




export const getAllUsers = async (): Promise<IUser[]> => {
        const response = await interceptorApiClient.get("/user")
        return response.data
}

export const getUserById = async (idUser : number): Promise<IUser> => {
    
        const response = await interceptorApiClient.get(`/user/${idUser}`)
        return response.data
}

export const getUserByName = async (userName : string): Promise<IUser> => {
        const response = await interceptorApiClient.get(`/user/search?userName=${userName}`)
        return response.data
}
 
export const createUser = async (newUser : IUser): Promise<IUser[]> => {
        const response = await interceptorApiClient.post("/user", newUser)
        return response.data
  
}

export const updateUser = async ( userUpdated : IUser): Promise<IUser[]> => {
        const response = await interceptorApiClient.put(`/user/${userUpdated.id}`, userUpdated)
        return response.data
}

export const deleteUser = async (idUser : number): Promise<IUser[]> => {
        const response = await interceptorApiClient.delete(`/user/${idUser}`)
        return response.data
}

export const getAllUsersActive = async () => {
   
        const response = await interceptorApiClient.get(`/user/active`)
        return response.data
  
}

export const getAllUsersInactive = async () => {
   
        const response = await interceptorApiClient.get(`/user/inactive`)
        return response.data
   
}