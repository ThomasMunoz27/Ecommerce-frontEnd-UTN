import { object, string } from "yup";

export const formOnlyNameSchema = object({
    name: string()
        .required("El campo no puede estar vacio")
})