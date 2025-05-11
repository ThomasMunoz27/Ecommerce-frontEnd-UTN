import { create } from "zustand";
import { IProduct } from "../types/IProduct";
import { ICartProduct } from "../types/ICartProduct";


interface IStoreCart {
    productsInCart: ICartProduct[] 

    addProductToCart: (product: IProduct) => void

    updateProductQuantity: (productId: number, newQuantity: number) => void

    removeProductFromCart: (productId: number) => void

    cleanCart: () => void
}

export const useStoreCart = create<IStoreCart>((set) => ({

    productsInCart: [] as ICartProduct[],

    addProductToCart: (product) => set((state) => {
        const existingProduct = state.productsInCart.find(p => p.id === product.id);
        
        if (existingProduct) {
        return {
            productsInCart: state.productsInCart.map(p =>
              p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
            )
          };
        }
    
        return {
          productsInCart: [...state.productsInCart, { ...product, quantity: 1 }]
        };
      }),


    updateProductQuantity: (productId, newQuantity) => set((state) => ({
        productsInCart: state.productsInCart.map((product) => product.id === productId ? {...product, quantity:newQuantity} : product),
    })),

    removeProductFromCart: (productId) => set((state) => ({productsInCart: state.productsInCart.filter((product) => product.id !== productId)})),

    cleanCart: () => set(() => ({productsInCart: []}))

}))