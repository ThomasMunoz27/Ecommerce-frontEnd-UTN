import { create } from "zustand";
import { IProduct } from "../types/IProduct";

interface IStoreProduct {

    activeProduct : IProduct | null
    products: IProduct[]

    setActiveProduct : (product: IProduct) => void
    setProducts : (products: IProduct[]) => void
}

export const useStoreProduct = create<IStoreProduct>((set) => ({
    activeProduct: null,
    products: [] as IProduct[],

    setActiveProduct: (activeProductIn) => set (() => ({activeProduct: activeProductIn})),

    setProducts: (productsIn) => set(() => ({products: productsIn}))
}
))

export default useStoreProduct