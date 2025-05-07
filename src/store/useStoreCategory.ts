import { create } from "zustand";
import { ICategory } from "../types/ICategory";

interface IStoreCategory {
    activeCategory : ICategory | null
    setActiveCategory: (category: ICategory) => void
}

export const useStoreCategory = create<IStoreCategory> ((set) => ({
    activeCategory : null,
    setActiveCategory : (category: ICategory) => set({activeCategory : category})
}))