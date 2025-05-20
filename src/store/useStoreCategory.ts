import { create } from "zustand";
import { ICategory } from "../types/ICategory";

interface IStoreCategory {
    activeCategory : ICategory | undefined
    setActiveCategory: (category: ICategory ) => void
}

export const useStoreCategory = create<IStoreCategory> ((set) => ({
    activeCategory : undefined,
    setActiveCategory : (category: ICategory) => { 
        localStorage.setItem('activeCategory', JSON.stringify(category))
        set({activeCategory : category}) 
    }
}))