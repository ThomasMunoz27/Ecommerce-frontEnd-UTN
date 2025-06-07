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

    const newPrice = (product?.prices.salePrice ? product?.prices.salePrice : 0) - (product?.prices.discount? product.prices.discount.promotionalPrice : 0)
    if(!product) return null
    
    

  return (
    <div className={style.productCard}>
        <div className={style.imgContainer}>
            <img className={style.cardImg} src={product.image?.url ? product.image.url : 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg'} alt="" />

        </div>
        <div className={style.notImgContainer}>
            <div className={style.cardHeader}>
              <div className={style.cardText}>
                <p className={style.productName}>{`${product.name} ${product.sex} `} </p>
                <p className={style.description}>Tamaño: {product.size.size} / Cantidad: {product.quantity} / Color: <span className={style.colorDot} style={getColorStyle(product.color.value)}></span>
                </p>
                
              </div>
              
            </div>


            <div className={style.productDetails}>
                {productInCart.prices.discount 
              ?<p className={style.prices}>
                  <span className={style.pricesOnDiscount}>${product.prices.salePrice}</span> <span className={style.cheaperPrice}>${newPrice}</span>
                </p>

              
              : 
              <p className={style.prices}><span className={style.prices}>${product.prices.salePrice}</span></p>

              }
            </div>
        </div>
</div>
  )
}