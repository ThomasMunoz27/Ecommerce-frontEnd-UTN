import { FC, useEffect, useState } from "react"
import { IProduct } from "../../../types/IProduct"
import style from './CardProduct.module.css'
import { useStoreCart } from "../../../store/useStoreCart"


interface Props {
    product: IProduct,
    categoryId: number,
    imageUrl: string

  }


export const CardProduct: FC<Props> = ({product, imageUrl}) => {
    
    const {addProductToCart} = useStoreCart()
  return (
    <div className={style.productCard}>
    <img className={style.cardImg} src={imageUrl} alt="" />
    <div className={style.notImgContainer}>
    <div className={style.cardText}>
        <p>{`${product.name} ${product.sex}`}</p>
        <p className={style.textCategory}>{product.category.name}</p>
    </div>
    <button onClick={() => addProductToCart(product)} className={style.cardBtn}>Añadir al carrito</button>
    </div>
{/* <p>{product.price.salePrice}</p> No consigo iterar sobre el precio del producto*/}

</div>
  )
}
