import { create } from "zustand";
import { ICountry } from "../types/ICountry";
import { getAllCountries } from "../cruds/crudCountry";

interface IUseStoreCountry{
    countries : ICountry[]
    activeCountry : ICountry | null
    setActiveCountry : (incomingCountry : ICountry | null) => void
    fetchCountry : () => Promise<void>
}

export const useStoreCountry = create<IUseStoreCountry>((set) => ({
    countries : [],
    activeCountry : null,

    setActiveCountry : (incommingCountry : ICountry | null) => set({activeCountry : incommingCountry}),
    fetchCountry : async() => {
        const fetchedCountries = await getAllCountries()
        set({countries : fetchedCountries})
    }
}))