import { create } from "zustand";
import { IProduct } from "../types/IProduct";
import { getAllProducts } from "../cruds/crudProduct";
import { ICreateProduct } from "../types/ICreateProduct";

interface IStoreProduct {

    activeProduct : IProduct | null 
    products: IProduct[]
    fetchProduct : () => Promise<void>

    setActiveProduct : (product: IProduct) => void
    setProducts : (products: IProduct[]) => void
}

export const useStoreProduct = create<IStoreProduct>((set) => ({
    activeProduct: null,
    products: [] as IProduct[],

    fetchProduct : async() => {
        const productsFetched = await getAllProducts()
        set({products : productsFetched})
    },


    setActiveProduct: (activeProductIn: IProduct) => {
        localStorage.setItem('activeProduct', JSON.stringify(activeProductIn))
        set (() => ({activeProduct: activeProductIn}))
    },

    setProducts: (productsIn) => set(() => ({products: productsIn}))
}
))

export default useStoreProduct