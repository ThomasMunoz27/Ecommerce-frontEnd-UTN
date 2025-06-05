import { create } from "zustand";
import { IProvince } from "../types/IProvince";
import { getAllProvinces } from "../cruds/crudProvince";

interface IUseStoreProvince{
    provinces : IProvince[]
    activeProvince : IProvince | null
    setActiveProvince : (incomingProvince : IProvince | null) => void
    fetchProvince : () => Promise<void>
}

export const useStoreProvince = create<IUseStoreProvince>((set) => ({
    provinces : [],
    activeProvince : null,

    setActiveProvince : (incomingProvince : IProvince | null) => set({activeProvince : incomingProvince}),
    fetchProvince : async() => {
        const fetchedProvince = await getAllProvinces()
        set({provinces : fetchedProvince})
    }
}))