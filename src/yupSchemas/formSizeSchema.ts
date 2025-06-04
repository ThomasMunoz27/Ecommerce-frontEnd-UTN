import { object, string } from "yup";

export const formSizeSchema = object({
    size: string()
        .required("El campo no puede estar vacio")
})