import { object, string } from "yup";

export const formOneSlotSchema = object({
    size: string()
        .required("El campo no puede estar vacio")
})