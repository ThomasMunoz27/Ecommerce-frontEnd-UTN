import { object, string } from "yup";

export const formCountrySchema = object({
    name: string()
        .required("El campo no puede estar vacio")
})