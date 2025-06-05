import * as yup from 'yup'
import { ProductType } from '../types/enums/ProductType'

export const productSchema = yup.object().shape({
    name : yup.string().required("Campo obligatorio"),
    description : yup.string().required("Campo obligatorio"),
    productType : yup.string().oneOf(Object.values(ProductType)),
    sex : yup.string().required("Campo obligatorio"),
    stock : yup.number().required("Campo obligatorio"),
    

    image : yup.object().shape({
        url : yup.string().required("Campo obligatorio")
    }),

    category : yup.object().shape({
        id : yup.number().required('Campo obligatorio'),
        name: yup.string().optional()
    }),

    sizes: yup.array(),
    colors: yup.array(),
})