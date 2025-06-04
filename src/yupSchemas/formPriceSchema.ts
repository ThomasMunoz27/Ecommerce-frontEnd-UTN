import { number, object } from "yup" 

export const formPriceSchema = object({
    purchasePrice : number().required("Campo obligatorio").min(0),
    salePrice : number().required("Campo obligatorio").min(0),
        

})