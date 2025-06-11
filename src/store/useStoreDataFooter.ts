import { create } from "zustand";

interface IUseStoreDataFooter {
    activeOption : string
    setActiveOption : (option : string) => void
}

export const useStoreDataFooter = create<IUseStoreDataFooter>((set) => ({
    activeOption : '',
    setActiveOption : (option) => set({activeOption : option})
}))