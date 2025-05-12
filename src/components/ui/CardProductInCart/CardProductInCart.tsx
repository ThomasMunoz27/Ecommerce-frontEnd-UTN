import { FC} from "react"
import style from './CardProductInCart.module.css'
import { useStoreCart } from "../../../store/useStoreCart"



interface IProductInCart {
    productId: number
    sizeId: number,
    
  }


export const CardProductInCart: FC<IProductInCart> = ({productId ,sizeId}) => {
    const {productsInCart,updateProductQuantity, removeProductFromCart} = useStoreCart()
    
    const product = productsInCart.find(p => p.size.id === sizeId && p.id === productId)

    if(!product) return null
    
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newQuantity = parseInt(e.target.value)
      updateProductQuantity(product.id, product.size.id, newQuantity)
    }

    const handleRemoveItem = () => {
      removeProductFromCart(product.id, product.size.id)
    }

  return (
    <div className={style.productCard}>
        <div className={style.imgContainer}>
            <img className={style.cardImg} src={product.image.url ? product.image.url : 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg'} alt="" />

        </div>
        <div className={style.notImgContainer}>
            <div className={style.cardHeader}>
              <div className={style.cardText}>
                <p className={style.productName}>{`${product.name} ${product.sex}`}</p>

                <p className={style.sizeText}>Tamaño: {product.size.size}</p>
              </div>
              <div>
                <img src="src\assets\cros_x.svg" alt="quitar" className={style.removeItemImg} onClick={handleRemoveItem}/>
              </div>
            </div>

            <select name="cantidad" id="cantidad" className={style.cantProduct} value={product.quantity} onChange={handleChange}>
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>{n}</option>
             ))}
            </select>

            <div className={style.productDetails}>
                <p className={style.textCategory}>{product.category.name}  <span className={style.prices}>${product.prices.salePrice}</span></p>
            </div>
        </div>
</div>
  )
}