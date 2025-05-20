import { FC} from "react"
import style from './CardProductInCheckout.module.css'
import { useStoreCart } from "../../../store/useStoreCart"
import { ICartProduct } from "../../../types/ICartProduct"
import { getColorStyle } from "../../../utils/getColorStyle"



interface IProductInCheckout {
    productInCart: ICartProduct
    
  }


export const CardProductInCheckout: FC<IProductInCheckout> = ({productInCart}) => {
    const {productsInCart} = useStoreCart()
    
    const product = productsInCart.find(p => p.size.id === productInCart.size.id && p.id === productInCart.id && p.color.id === productInCart.color.id)

    if(!product) return null
    
    

  return (
    <div className={style.productCard}>
        <div className={style.imgContainer}>
            <img className={style.cardImg} src={product.image.url ? product.image.url : 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg'} alt="" />

        </div>
        <div className={style.notImgContainer}>
            <div className={style.cardHeader}>
              <div className={style.cardText}>
                <p className={style.productName}>{`${product.name} ${product.sex} `} ${product.prices.salePrice}</p>
                <p className={style.description}>Tamaño: {product.size.size} / Cantidad: {product.quantity} / Color: <span className={style.colorDot} style={getColorStyle(product.color.value)}></span>
                </p>
                
              </div>
              
            </div>


            <div className={style.productDetails}>
                <p className={style.textCategory}>{product.category.name} </p>
            </div>
        </div>
</div>
  )
}