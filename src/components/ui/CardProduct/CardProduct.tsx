import { FC} from "react"
import { IProduct } from "../../../types/IProduct"
import style from './CardProduct.module.css'
import { useStoreModal } from "../../../store/useStoreModal"
import useStoreProduct from "../../../store/useStoreProduct"
import { useNavigate } from "react-router"



interface Props {
    product: IProduct,
  }

  
  export const CardProduct: FC<Props> = ({product}) => {
    const {openModalAddProduct} = useStoreModal()
    const {setActiveProduct} = useStoreProduct()


   const handleOpenModalAddProduct = () => {
    setActiveProduct(product)
    openModalAddProduct()
   }
   const navigate = useNavigate()
   const handleDetails = () => {
        setActiveProduct(product)
        navigate("/product-detail")
    }

  return (
    <div className={style.productCard} key={product.id}>
      <div className={style.imageWrapper}>
        {product.prices.discount && (
		      <div className={style.discountBadge}>Descuento</div>
	      )}
        <img className={style.cardImg} src={
          product.image ? product.image.url : 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg'} alt="" onClick={handleDetails}/>

      </div>
    <div className={style.notImgContainer}>
    <div className={style.cardText}>
        <p className={style.productName}>{`${product.name} ${product.sex}`}</p>
        <div className={style.textCategory}>
          <div className={style.categoryContainer}>
          {product.category.map((categoria) => (
          <p key={categoria.id}>{categoria.name}</p>

         
          ))}</div>  
          <div className={style.showPricesContainer}>
            {product.prices.discount 
            ?<>
              <span className={style.pricesOnDiscount}>${product.prices.salePrice}</span>
              <span className={style.prices}>${product.prices.salePrice - product.prices.discount.promotionalPrice}</span>
            </>
            :<span className={style.prices}>${product.prices.salePrice}</span>

            }
            
          </div>

        </div>
    </div>
    <button onClick={handleOpenModalAddProduct} className={style.cardBtn}>Añadir al carrito</button>
    </div>
</div>
  )
}
