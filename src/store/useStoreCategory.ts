import { create } from "zustand";
import { ICategory } from "../types/ICategory";
import { getAllCategories } from "../cruds/crudCategory";

interface IStoreCategory {
    categories : ICategory[]
    activeCategory : ICategory | undefined | null
    setCategories : (incomingCategories : ICategory[]) => void
    setActiveCategory: (category: ICategory | null ) => void
    fetchCategory : () => Promise<void>
}

export const useStoreCategory = create<IStoreCategory> ((set) => ({
    categories : [],

    activeCategory : undefined,

    setCategories : (incomingCategories) => set({categories : incomingCategories}),
    
    setActiveCategory : (category: ICategory | null) => { 
        localStorage.setItem('activeCategory', JSON.stringify(category))
        set({activeCategory : category}) 
    },

    fetchCategory : async () => {
            const categoryFetched = await getAllCategories()
            set({categories : categoryFetched})
        }
}))