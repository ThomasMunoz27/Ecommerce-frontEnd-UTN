import { number, object, string } from "yup";

export const formProductSchema = object({
    name: string()
        .required("El campo no puede estar vacio"),
    description: string().required("El campo no puede estar vacío").min(7, "No se permiten descripciones cortas"),
    sex: string()
		.oneOf(['Masculino', 'Femenino', 'Unisex'], 'Debe seleccionar un sexo válido')
		.required('El sexo es obligatorio'),
    stock: number()
        .required("El campo no puede estar vacío")
        
})