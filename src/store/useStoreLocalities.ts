import { create } from "zustand";
import { ILocality } from "../types/ILocality";
import { getAllLocalities } from "../cruds/crudLocality";

interface IUseStoreLocalities{
    localities : ILocality[]
    activeLocality : ILocality | null
    setActiveLocality : (incomingLocality : ILocality | null) => void
    fetchLocality : () => Promise<void>
}

export const useStoreLocality = create<IUseStoreLocalities>((set) => ({
    localities : [],
    activeLocality : null,

    setActiveLocality : (incommingLocality : ILocality | null) => set({activeLocality : incommingLocality}),
    fetchLocality : async() => {
        const fetchedLocality = await getAllLocalities()
        set({localities : fetchedLocality})
    }
}))