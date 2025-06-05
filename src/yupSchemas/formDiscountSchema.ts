import { object, string, number } from "yup";

export const formDiscountSchema = object({
	name: string()
		.required("El nombre no puede estar vacío")
		.min(3, "El nombre debe tener al menos 3 caracteres"),
	
	discountDescription: string()
		.required("La descripción no puede estar vacía")
		.min(5, "La descripción debe tener al menos 5 caracteres"),
	
	dateFrom: string()
		.required("La fecha desde no puede estar vacía")
		.matches(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (AAAA-MM-DD)"),

	dateTo: string()
		.required("La fecha hasta no puede estar vacía")
		.matches(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (AAAA-MM-DD)"),
	
timeFrom: string()
		.required("La hora desde no puede estar vacía")
		.matches(/^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/, "Formato de hora inválido (HH:mm:ss)"),

	timeTo: string()
		.required("La hora hasta no puede estar vacía")
		.matches(/^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/, "Formato de hora inválido (HH:mm:ss)"),

	promotionalPrice: number()
		.required("El precio promocional es obligatorio")
		.typeError("El precio debe ser un número")
		.min(1, "El precio debe ser mayor a 0"),
});