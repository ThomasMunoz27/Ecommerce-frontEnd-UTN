import { date, object, ref, string } from "yup";

export const formUserRegisterSchema = object({
    nombre: string()
        .required("El campo no puede estar vacio"),
    apellido: string()
        .required("El campo no puede estar vacio"),
    username: string()
        .required("El campo no puede estar vacio"),
    dni: string()
        .required("El campo no puede estar vacio"),
    email: string()
        .required("El campo no puede estar vacio")
        .email('Comprueba que tu dirección de correo electrónico es correcta.'),
    phoneNumber: string()
    .matches(/^\d+$/, "Debe contener solo números")
    .required('Introduce tu número de teléfono'),
    fechaNacimiento: date()
            .max(new Date(), 'La fecha no puede ser futura')
            .typeError('Debes ingresar una fecha válida')
            .required('La fecha de nacimiento es obligatoria'),
    password: string()
    .required("El campo es obligatorio"),
    repeatPassword: string()
    .oneOf([ref("password")], "Las contraseñas no coinciden")
    .required("El campo es obligatorio")

})