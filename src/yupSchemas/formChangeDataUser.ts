import { date, object, string } from "yup";



export const formChangeDataUser = object({
    name: string().required('El nombre es requerido'),
	lastName: string().required('El apellido es requerido'),
    birthdate: date()
        .max(new Date(), 'La fecha no puede ser futura')
		.typeError('Debes ingresar una fecha válida')
		.required('La fecha de nacimiento es obligatoria'),
	sex: string()
		.oneOf(['Hombre', 'Mujer', 'Otro'], 'El sexo es obligatorio')
		.required('El sexo es obligatorio')
})