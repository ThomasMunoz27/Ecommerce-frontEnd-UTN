import { getAllProducts } from "../cruds/crudProduct"
import { IProduct } from "../types/IProduct"

export const checkImageUsed = async (imageId: number) => {
    let allProducts: IProduct[] = []

    const getingAllProducts = async () => {
        allProducts = await getAllProducts()
    }
    getingAllProducts()
    console.log("entra a la comprobacion de imagen")
    const response = allProducts.some(p => p.image?.id === imageId)
    console.log(response)
    return response
}