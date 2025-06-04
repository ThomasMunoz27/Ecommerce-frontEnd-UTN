import { create } from "zustand";
import { IUser } from "../types/IUser";
import { getAllUsers, getAllUsersActive, getAllUsersInactive } from "../cruds/crudUsers";

interface IStoreUsers {
    user : IUser | null, // Usuario ,
    users : IUser[] // Momentaneo para probar
    setUser : (userData : IUser) => void, // setear usuario
    clearUser: () => void  // desloguear usuario
    fetchUsers : (state : string) => Promise<void>
    
}


export const useStoreUsers = create<IStoreUsers>((set) => ({
    user : null,
    users : [] as IUser[], 
    setUser: (userData) => set({user : userData}),
    clearUser: () => set({user : null}),

    fetchUsers : async(state : string) => {

        if(state === 'alls'){
            const usersFetched = await getAllUsers()
            set({users : usersFetched})

        } else if (state === 'active'){
            const usersFetched = await getAllUsersActive()
            set({users : usersFetched})

        } else if (state === 'inactive'){
            const usersFetched = await getAllUsersInactive()
            set({users : usersFetched})
        }
    }
}))