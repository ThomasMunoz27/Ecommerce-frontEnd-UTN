import { IProduct } from "../types/IProduct";
import { errorAlert } from "./errorAlert";

export const checkProductAtributes =  (product: IProduct): boolean => {
	const validations = [
		{
			condition: product.colors.length === 0,
			message: "Debe asignar al menos un Color al producto"
		},
		{
			condition: product.prices.id === 0,
			message: "Debe asignar un Precio al producto"
		},
		{
			condition: product.category.length === 0,
			message: "Debe asignar al menos una Categoria al producto"
		},
		{
			condition: product.sizes.length === 0,
			message: "Debe asignar al menos un talle al producto"
		},
        {
            condition: product.image?.id === 0 ,
            message: "Debe asignar una imagen al producto"
        }
	];

	console.log(validations)
	for (const validation of validations) {
		if (validation.condition) {
			console.log(validation)
			errorAlert("Error", validation.message);
			return false;
		}
	}

	return true;
};