import { number, object, string } from "yup";

export const formAdressSchema = object({
    street: string()
        .required("El campo no puede estar vacio"),
    number: number()
		.required("El campo no puede estar vacío")
		.moreThan(0, "El número debe ser mayor a 0"),
	cp: number()
		.required("El campo no puede estar vacío")
		.moreThan(0, "El código postal debe ser mayor a 0")
})