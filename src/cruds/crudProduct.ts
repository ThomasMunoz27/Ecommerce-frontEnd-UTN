import interceptorApiClient from "../interceptors/axios.interceptor"
import { IProduct } from "../types/IProduct"
import { ICreateProduct } from "../types/ICreatedProducts"





export const getAllProducts = async (): Promise<IProduct[]> => {
        const response = await interceptorApiClient.get("/product")
        return response.data
}

export const getProductById = async (idProduct: string) => {
    const response = await interceptorApiClient.get(`/product${idProduct}`)
    return response.data
}


export const postProduct = async (newProduct: ICreateProduct) => {
   
        const response = await interceptorApiClient.post('/product', newProduct)
        return response.data
    
}

export const putProduct = async (updatedProduct: IProduct) => {
        const response = await interceptorApiClient.post(`/product/${updatedProduct.id}`, updatedProduct)
        return response.data
}

export const deleteProduct = async (idProductToDelete: number) => {
        const response = await interceptorApiClient.delete(`/product/${idProductToDelete}`)
        return response.data
}

export const getAllProductsActive = async () => {
        const response = await interceptorApiClient.get(`/product/active`)
        return response.data
}

export const getAllProductsInactive = async () => {
    const response = await interceptorApiClient.get(`/product/inactive`)
    return response.data
}


export const getAllProductsPaged = async (page: number, size: number, categoryId? : number) => {
    try {
        if(categoryId){
            const response = await interceptorApiClient.get(`/product/paged?page=${page}&size=${size}&categoryId=${categoryId}`)
            return response.data

        }else{
            const response = await interceptorApiClient.get(`/product/paged?page=${page}&size=${size}`)
            return response.data
        }
    } catch (error) {
        console.error('Error en getAllProductsPaged', error);
        
    }
}

export const getProductsFiltered = async (category: string) => {
        const response = await interceptorApiClient.get(`/product/filter?categoria=${category}`)
        return response.data
   
}