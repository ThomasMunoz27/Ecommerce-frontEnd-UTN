import { create } from "zustand";
import { IProduct } from "../types/IProduct";


interface IStoreCart {
    productsInCart: IProduct[] 

    addProductToCart: (product: IProduct) => void

    removeProductFromCart: (productId: number) => void

    cleanCart: () => void
}

export const useStoreCart = create<IStoreCart>((set) => ({

    productsInCart: [] as IProduct[],

    addProductToCart: (product) => set((state) => ({productsInCart: [...state.productsInCart, product]})),

    removeProductFromCart: (productId) => set((state) => ({productsInCart: state.productsInCart.filter((product) => product.id !== productId)})),

    cleanCart: () => set(() => ({productsInCart: []}))

}))