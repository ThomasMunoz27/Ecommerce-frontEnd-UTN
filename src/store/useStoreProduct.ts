import { create } from "zustand";
import { IProduct } from "../types/IProduct";
import { getAllProducts, getAllProductsActive, getAllProductsInactive } from "../cruds/crudProduct";


interface IStoreProduct {

    activeProduct : IProduct | null 
    products: IProduct[]
    fetchProduct : (state : string) => Promise<void>
   


    setActiveProduct : (product: IProduct) => void
    setProducts : (products: IProduct[]) => void
}

export const useStoreProduct = create<IStoreProduct>((set) => ({
    activeProduct: null,
    products: [] as IProduct[],

    fetchProduct : async( state : string) => {
        if(state === 'alls'){
            const productsFetched = await getAllProducts()
            set({products : productsFetched})
        } else if (state === 'active'){
            const productsFetched = await getAllProductsActive()
            set({products : productsFetched})
        } else if (state === 'inactive'){
            const productsFetched = await getAllProductsInactive()
            set({products : productsFetched})
        }
    },

    

    setActiveProduct: (activeProductIn: IProduct) => {
        localStorage.setItem('activeProduct', JSON.stringify(activeProductIn))
        set (() => ({activeProduct: activeProductIn}))
    },

    setProducts: (productsIn) => set(() => ({products: productsIn}))
}
))

export default useStoreProduct