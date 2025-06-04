import { number, object } from "yup" 

export const formPriceSchema = object({
	purchasePrice: number()
		.required("Campo obligatorio")
		.min(1, "Debe ser mayor o igual a 1"),
	salePrice: number()
		.required("Campo obligatorio")
		.min(2, "Debe ser mayor o igual a 2")
		.test(
			"greater-than-purchase",
			"El precio de venta debe ser mayor al precio de compra",
			function (value) {
				const { purchasePrice } = this.parent
				return value !== undefined && purchasePrice !== undefined
					? value > purchasePrice
					: true
			}
		),
})