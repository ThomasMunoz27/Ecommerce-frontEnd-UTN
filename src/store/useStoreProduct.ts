import { create } from "zustand";
import { IProduct } from "../types/IProduct";
import { getAllProducts, getAllProductsActive, getAllProductsInactive } from "../cruds/crudProduct";


interface IStoreProduct {

    activeProduct : IProduct | null 
    products: IProduct[]
    fetchProduct : (state : string ) => Promise<void>
   


    setActiveProduct : (product: IProduct) => void
    setProducts : (products: IProduct[]) => void
}

export const useStoreProduct = create<IStoreProduct>((set) => ({
    activeProduct: null,
    products: [] as IProduct[],

    fetchProduct : async( state : string) => {
        if(state === 'alls'){
            const productsFetchedAlls = await getAllProducts()
            set({products : productsFetchedAlls})
        } else if (state === 'active'){
            const productsFetchedActive = await getAllProductsActive()
            set({products : productsFetchedActive})
        } else if (state === 'inactive'){
            const productsFetchedInactive = await getAllProductsInactive()
            set({products : productsFetchedInactive})
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