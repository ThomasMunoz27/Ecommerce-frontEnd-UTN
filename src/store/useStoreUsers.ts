import { create } from "zustand";
import { IUser } from "../types/IUser";

interface IStoreUsers {
    user : IUser | null, // Usuario ,
    users : IUser[] // Momentaneo para probar
    setUser : (userData : IUser) => void, // setear usuario
    clearUser: () => void  // desloguear usuario
    
}


export const useStoreUsers = create<IStoreUsers>((set) => ({
    user : null,
    users : [] as IUser[], 
    setUser: (userData) => set({user : userData}),
    clearUser: () => set({user : null})
}))