import { create } from "zustand";
import { IUser } from "../types/IUser";
import { getAllUsers, getAllUsersActive, getAllUsersInactive } from "../cruds/crudUsers";

interface IStoreUsers {
    userName: string
    user : IUser | null, // Usuario ,
    users : IUser[] // Momentaneo para probar
    activeUser : IUser | null
    setUser : (userData : IUser | null) => void, // setear usuario
    clearUser: () => void  // desloguear usuario
    fetchUsers : (state : string) => Promise<void>
    setUserName: (username: string) => void
    setActiveUser : (user : IUser | null) => void
}


export const useStoreUsers = create<IStoreUsers>((set) => ({
    userName : '',
    user : null,
    users : [] as IUser[], 
    activeUser : null,
    setUser: (userData) => set({user : userData}),
    clearUser: () => set({user : null}),
    setUserName: (userName) => set({userName: userName}),
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
    },

    setActiveUser : (user : IUser | null) => set({activeUser : user})
}))