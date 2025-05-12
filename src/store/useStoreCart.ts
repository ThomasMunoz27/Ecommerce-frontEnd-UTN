import { create } from "zustand";
import { ICartProduct } from "../types/ICartProduct";


interface IStoreCart {
    productsInCart: ICartProduct[] 

    addProductToCart: (product: ICartProduct) => void

    updateProductQuantity: (productId: number, newQuantity: number, productSizeId: number) => void

    removeProductFromCart: (productId: number, sizeId: number) => void

    cleanCart: () => void
}

export const useStoreCart = create<IStoreCart>((set) => ({

    productsInCart: [] as ICartProduct[],

    addProductToCart: (product) => set((state) => {
      const existingProduct = state.productsInCart.find(p => p.id === product.id && p.size.id === product.size.id);
        
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


      updateProductQuantity: (productId, productSizeId, newQuantity) => set((state) => ({
        productsInCart: state.productsInCart.map((product) => 
            product.id === productId && product.size.id === productSizeId 
                ? { ...product, quantity: newQuantity } 
                : product
        ),
    })),

    removeProductFromCart: (productId, sizeId) => set((state) => ({productsInCart: state.productsInCart.filter((product) => product.size.id !== sizeId || product.id !== productId)})),

    cleanCart: () => set(() => ({productsInCart: []}))

}))