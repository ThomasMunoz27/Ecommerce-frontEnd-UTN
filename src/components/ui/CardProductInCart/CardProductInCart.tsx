import { FC} from "react"
import { IProduct } from "../../../types/IProduct"
import style from './CardProductInCart.module.css'



interface IProductInCart {
    product: IProduct,
  }


export const CardProductInCart: FC<IProductInCart> = ({product}) => {
    
    

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

            <select name="cantidad" id="cantidad" className={style.cantProduct}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>

            <div className={style.productDetails}>
                <p className={style.textCategory}>{product.category.name}  <span className={style.prices}>${product.prices.salePrice}</span></p>
            </div>
        </div>
</div>
  )
}