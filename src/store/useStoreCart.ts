import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ICartProduct } from "../types/ICartProduct";
import { miniAlert } from "../utils/miniAlert";
import { miniErrorAlert } from "../utils/miniErrorAlert";
import { deleteProduct, putProduct } from "../cruds/crudProduct";
import { errorAlert } from "../utils/errorAlert";
import { succesAlert } from "../utils/succesAlert";

interface IStoreCart {
	productsInCart: ICartProduct[];

	addProductToCart: (product: ICartProduct) => void;

	updateProductQuantity: (updatedProduct: ICartProduct, newQuantity: number) => void;

	removeProductFromCart: (productToRemove: ICartProduct) => void;

	cleanCart: () => void;
	
	cantProducts: () => number;
	
	totalCart: () => number;
	
	totalCartWithDiscount: () => number

	reduceStock: () => void;
}

export const useStoreCart = create<IStoreCart>()(
	persist(
		(set, get) => ({
			productsInCart: [],

			addProductToCart: (product) =>
				set((state) => {
					const existingProduct = state.productsInCart.find(
						(p) =>
							p.id === product.id &&
							p.size.id === product.size.id &&
							p.color.id === product.color.id
					);

					if (existingProduct) {
						if(existingProduct.quantity < 10 && existingProduct.quantity < existingProduct.stock){
							return {
								productsInCart: state.productsInCart.map((p) =>
									p.id === product.id &&
									p.size.id === product.size.id &&
									p.color.id === product.color.id
										? { ...p, quantity: p.quantity + 1 }
										: p
								),
							};
						}else{
							miniErrorAlert("Error", "Cantidad maxima de este producto por compra")
							return {}
						}
					}
        miniAlert('Producto agregado al carrito', '')

					return {
						productsInCart: [...state.productsInCart, { ...product, quantity: 1 }],
            
					};
          
				}),

			updateProductQuantity: (updatedProduct, newQuantity) =>
				set((state) => ({
					productsInCart: state.productsInCart.map((product) =>
						product.id === updatedProduct.id &&
						product.size.id === updatedProduct.size.id &&
						product.color.id === updatedProduct.color.id
							? { ...product, quantity: newQuantity }
							: product
					),
				})),

			removeProductFromCart: (productToRemove) =>
				set((state) => ({
					productsInCart: state.productsInCart.filter(
						(product) =>
							!(
								product.id === productToRemove.id &&
								product.size.id === productToRemove.size.id &&
								product.color.id === productToRemove.color.id
							)
					),
				})),

			cleanCart: () => {
        localStorage.removeItem("cart-storage");
        set(() => ({ productsInCart: [] }))
      },

			cantProducts: () => {
				const products = get().productsInCart;
				return products.reduce((sum, p) => sum + p.quantity, 0);
			},

			totalCart: () => {
				const products = get().productsInCart;
				return products.reduce((sum, p) => sum + p.quantity * p.prices.salePrice, 0);
			},

			totalCartWithDiscount: () => {
				const products = get().productsInCart;
				const hasDiscount = products.some(p => p.prices.discount)
				if (!hasDiscount) return 0;
				return products.reduce((sum, p) => sum + p.quantity * (p.prices.salePrice - (p.prices.discount ? p.prices.discount.promotionalPrice : 0)), 0);
			},

			reduceStock: async () => {
				try{
					const productsSelled = get().productsInCart
					for(const product of productsSelled){
						const updatedStock = product.stock - product.quantity
						if(updatedStock <= 0){
							console.log("Producto desactivado")
							await deleteProduct(Number(product.id))
							continue
						}
						const productToUpdate = {
							...product,
							stock: updatedStock
						}
						try{
							await putProduct(productToUpdate)
	
						}catch (error){
							errorAlert("Error", `Stock negativo para producto ID: ${product.id}`)
	
						}
					}

				}catch (error){
					errorAlert("Error", `Error en la compra`)

				}finally{
					get().cleanCart()
					succesAlert("Compra Finalizada", "Tu compra se ha completado con exito")
				}
				
			}
		}),
		{
			name: "cart-storage", // clave en localStorage
			partialize: (state) => ({
				productsInCart: state.productsInCart,
			}), // solo persistimos el array, no las funciones
		}
	)
);
