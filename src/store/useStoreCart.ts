import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ICartProduct } from "../types/ICartProduct";
import { miniAlert } from "../utils/miniAlert";

interface IStoreCart {
	productsInCart: ICartProduct[];

	addProductToCart: (product: ICartProduct) => void;

	updateProductQuantity: (updatedProduct: ICartProduct, newQuantity: number) => void;

	removeProductFromCart: (productToRemove: ICartProduct) => void;

	cleanCart: () => void;

	cantProducts: () => number;

	totalCart: () => number;
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
						return {
							productsInCart: state.productsInCart.map((p) =>
								p.id === product.id &&
								p.size.id === product.size.id &&
								p.color.id === product.color.id
									? { ...p, quantity: p.quantity + 1 }
									: p
							),
						};
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
		}),
		{
			name: "cart-storage", // clave en localStorage
			partialize: (state) => ({
				productsInCart: state.productsInCart,
			}), // solo persistimos el array, no las funciones
		}
	)
);
