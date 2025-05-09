import { FC} from "react"
import { IProduct } from "../../../types/IProduct"
import style from './CardProduct.module.css'
import { useStoreCart } from "../../../store/useStoreCart"



interface Props {
    product: IProduct,
  }


export const CardProduct: FC<Props> = ({product}) => {
    
    const {addProductToCart} = useStoreCart()
  return (
    <div className={style.productCard}>
    <img className={style.cardImg} src={product.image.url ? product.image.url : 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg'} alt="" />
    <div className={style.notImgContainer}>
    <div className={style.cardText}>
        <p className={style.productName}>{`${product.name} ${product.sex}`}</p>
        <p className={style.textCategory}>{product.category.name}  <span className={style.prices}>${product.prices.salePrice}</span></p>
    </div>
    <button onClick={() => addProductToCart(product)} className={style.cardBtn}>Añadir al carrito</button>
    </div>
</div>
  )
}
