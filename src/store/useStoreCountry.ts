import { create } from "zustand";
import { ICountry } from "../types/ICountry";

interface IUseStoreCountry{
    countries : ICountry[]
    activeCountry : ICountry | null
    setActiveCountry : (incomingCountry : ICountry | null) => void
}

export const useStoreCountry = create((set) => ({

}))