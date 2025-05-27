import { create } from "zustand";

interface IUseStoreAdmin {
    activeOption : string
    setActiveOption : (option : string) => void
}

export const useStoreAdmin = create<IUseStoreAdmin>((set) => ({
    activeOption : '',
    setActiveOption : (option) => set({activeOption : option})
}))