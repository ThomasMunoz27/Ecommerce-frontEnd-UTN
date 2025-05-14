import { create } from "zustand";
import { ICartProduct } from "../types/ICartProduct";


interface IStoreCart {
    productsInCart: ICartProduct[] 

    addProductToCart: (product: ICartProduct) => void

    updateProductQuantity: (updatedProduct: ICartProduct, newQuantity: number) => void

    removeProductFromCart: (productToRemove: ICartProduct) => void

    cleanCart: () => void
}

export const useStoreCart = create<IStoreCart>((set) => ({

    productsInCart: [] as ICartProduct[],

    addProductToCart: (product) => set((state) => {
      const existingProduct = state.productsInCart.find(p => p.id === product.id && p.size.id === product.size.id && p.color.id === product.color.id);
        
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


      updateProductQuantity: (updatedProduct, newQuantity) => set((state) => ({
        productsInCart: state.productsInCart.map((product) => 
            product.id === updatedProduct.id && product.size.id === updatedProduct.size.id && product.color.id === updatedProduct.color.id
                ? { ...product, quantity: newQuantity } 
                : product
        ),
    })),

    removeProductFromCart: (productToRemove) => set((state) => ({productsInCart: state.productsInCart.filter((product) => !(product.size.id == productToRemove.size.id && product.id == productToRemove.id && product.color.id == productToRemove.color.id))})),

    cleanCart: () => set(() => ({productsInCart: []}))

}))