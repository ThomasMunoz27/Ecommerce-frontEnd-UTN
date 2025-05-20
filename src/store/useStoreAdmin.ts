import { create } from "zustand";

interface IUseStoreAdmin {
    activeOption : 'product' | 'users' | ''
    setActiveOption : (option : 'product' | 'users' | '') => void
}

export const useStoreAdmin = create<IUseStoreAdmin>((set) => ({
    activeOption : '',
    setActiveOption : (option) => set({activeOption : option})
}))