import { object, string } from "yup";

export const formOneSlotSchema = object({
    name: string()
        .required("El campo no puede estar vacio")
})