
import { ICreateProduct } from "../types/ICreatedProducts";
import { IProduct } from "../types/IProduct";

export function mapProductToPayload(product: IProduct): ICreateProduct {

  return {
    name: product.name,
    description: product.description,
    productType : product.productType,
    sex: product.sex,
    stock: product.stock,
    active: product.active,
    image: { id: product.image?.id! },       
    prices: { id: product.prices.id! },
    colors: product.colors.map(c => ({ id: c.id })),
    sizes: product.sizes.map(s => ({ id: s.id })),
    category: product.category.map(cat => ({ id: cat.id! })),
    
  };
}