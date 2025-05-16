import { object, string } from "yup";

export const formCheckoutSchema = object({
    email: string().email('Comprueba que tu dirección de correo electrónico es correcta.'),
    name: string().required('El nombre es requerido'),
    phoneNumber: string()
    .matches(/^\d{8,15}$/, 'El número debe tener entre 8 y 15 dígitos')
    .required('Introduce tu número de teléfono'),
    dni: string()
    .matches(/^\d{7,9}$/, 'El DNI debe tener entre 7 y 9 dígitos')
    .required('El DNI es obligatorio'),
})