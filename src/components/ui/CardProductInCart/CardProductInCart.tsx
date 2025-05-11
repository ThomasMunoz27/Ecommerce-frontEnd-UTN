import { FC} from "react"
import style from './CardProductInCart.module.css'
import { useStoreCart } from "../../../store/useStoreCart"



interface IProductInCart {
    productId: number,
    
  }


export const CardProductInCart: FC<IProductInCart> = ({productId}) => {
    const {productsInCart,updateProductQuantity} = useStoreCart()
    const product = productsInCart.find(p => p.id === productId)

    if(!product) return null
    
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
       const newQuantity = parseInt(e.target.value)
       console.log(product.quantity)
       updateProductQuantity(product.id, newQuantity)
       console.log(product.quantity)

    }

  return (
    <div className={style.productCard}>
        <div className={style.imgContainer}>
            <img className={style.cardImg} src={product.image.url ? product.image.url : 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg'} alt="" />

        </div>
        <div className={style.notImgContainer}>
            <div className={style.cardText}>
            <p className={style.productName}>{`${product.name} ${product.sex}`}</p>

            <p className={style.sizeText}>Tamaño: </p>
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