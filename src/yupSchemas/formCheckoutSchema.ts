import { object, string } from "yup";

export const formCheckoutSchema = object({
    email: string().required().email('Comprueba que tu dirección de correo electrónico es correcta.'),
    name: string().required('El nombre es requerido'),
    phoneNumber: string()
    .matches(/^\d{8,15}$/, 'El número debe tener entre 8 y 15 dígitos')
    .required('Introduce tu número de teléfono'),
    dni: string()
    .matches(/^\d{7,9}$/, 'El DNI debe tener entre 7 y 9 dígitos')
    .required('El DNI es obligatorio'),
    country: string()
	.required("El país es obligatorio"),

	province: string()
		.required("La provincia es obligatoria"),

	locality: string()
		.required("La localidad es obligatoria"),

	cp: string()
		.matches(/^\d{4,10}$/, "El código postal debe tener entre 4 y 10 dígitos")
		.required("El código postal es obligatorio"),

	street: string()
		.min(3, "La calle debe tener al menos 3 caracteres")
		.required("La calle es obligatoria"),

})