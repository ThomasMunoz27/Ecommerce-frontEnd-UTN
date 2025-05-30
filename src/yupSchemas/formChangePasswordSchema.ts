import { object, ref, string } from "yup";



export const formChangePasswordSchema = object({
    oldPassword: string().required("*El campo es obligatorio"),
    newPassword: string().required("*El campo es obligatorio")
    .min(8, '*Debe tener al menos 8 caracteres')
    .matches(/[A-Z]/, '*Debe contener al menos una letra mayúscula')
    .matches(/[a-z]/, '*Debe contener al menos una letra minúscula')
    .matches(/[0-9]/, '*Debe contener al menos un número')
    .matches(/[@$!%*?&]/, '*Debe contener al menos un carácter especial (@$!%*?&)'),
    repeatNewPassword: string().oneOf([ref("newPassword")], "*Las contraseñas no coinciden")
})