import { object, string } from "yup";

export const formCategorySchema = object({
    name: string()
        .required("El campo no puede estar vacio")
})