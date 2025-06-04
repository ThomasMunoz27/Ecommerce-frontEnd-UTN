import { create } from "zustand";

import { IAdress } from "../types/IAdress";
import { getAllAdress } from "../cruds/crudAddress";

interface IUseStoreAdresses{
    adresses : IAdress[]
    activeAdress : IAdress | null
    setActiveAdress : (incommingAdress : IAdress | null) => void
    fetchAdress : () => Promise<void>
}

export const useStoreAdress = create<IUseStoreAdresses>((set) => ({
    adresses : [],
    activeAdress : null,

    setActiveAdress : (incommingAdress : IAdress | null) => set({activeAdress : incommingAdress}),
    fetchAdress : async() => {
        const fetchedAdress = await getAllAdress()
        set({adresses : fetchedAdress})
    }
}))