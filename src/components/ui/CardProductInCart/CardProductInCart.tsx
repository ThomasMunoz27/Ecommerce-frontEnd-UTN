import { FC} from "react"
import style from './CardProductInCart.module.css'
import { useStoreCart } from "../../../store/useStoreCart"
import { ICartProduct } from "../../../types/ICartProduct"
import { getColorStyle } from "../../../utils/getColorStyle"



interface IProductInCart {
    productInCart: ICartProduct
    
  }


export const CardProductInCart: FC<IProductInCart> = ({productInCart}) => {
    const {productsInCart,updateProductQuantity, removeProductFromCart} = useStoreCart()
    
    const product = productsInCart.find(p => p.size.id === productInCart.size.id && p.id === productInCart.id && p.color.id === productInCart.color.id)

    const newPrice = (product?.prices.salePrice ? product?.prices.salePrice : 0) - (product?.prices.discount? product.prices.discount.promotionalPrice : 0)
    
    if(!product) return null
    
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newQuantity = parseInt(e.target.value)
      updateProductQuantity(product, newQuantity)
    }

    const handleRemoveItem = () => {
      removeProductFromCart(product)
    }

  return (
    <div className={style.productCard}>
        <div className={style.imgContainer}>
            <img className={style.cardImg} src={product.image?.url ? product.image.url : 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg'} alt="" />

        </div>
        <div className={style.notImgContainer}>
            <div className={style.cardHeader}>
              <div className={style.cardText}>
                <p className={style.productName}>{`${product.name} ${product.sex} `} </p>
                <p className={style.colorText}>Color: <span className={style.colorDot} style={getColorStyle(product.color.value)}></span></p>
                <p className={style.sizeText}>Tamaño: {product.size.size}</p>
              </div>
              <div>
                <img src="src\assets\cros_x.svg" alt="quitar" className={style.removeItemImg} onClick={handleRemoveItem}/>
              </div>
            </div>

            <select name="cantidad" id="cantidad" className={style.cantProduct} value={product.quantity} onChange={handleChange}>
              {Array.from({ length: Math.min(product.stock, 10) }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>{n}</option>
             ))}
            </select>

            <div className={style.productDetails}>
              {productInCart.prices.discount 
              ?<p className={style.textCategory}>  <span className={style.pricesOnDiscount}>${product.prices.salePrice}</span><span className={style.cheaperPrice}>${newPrice}</span></p>

              
              : 
              <p className={style.textCategory}><span className={style.prices}>${product.prices.salePrice}</span></p>

              }
            </div>
        </div>
</div>
  )
}