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
    <div className={style.productCard}>
    <img className={style.cardImg} src={
      product.image ? product.image.url : 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg'} alt="" onClick={handleDetails}/>
    <div className={style.notImgContainer}>
    <div className={style.cardText}>
        <p className={style.productName}>{`${product.name} ${product.sex}`}</p>
        <p className={style.textCategory}>
          <div className={style.categoryContainer}>
          {product.category.map((categoria) => (
          <p>{categoria.name}</p>

         
          ))}</div>  <span className={style.prices}>${product.prices.salePrice}</span></p>
    </div>
    <button onClick={handleOpenModalAddProduct} className={style.cardBtn}>Añadir al carrito</button>
    </div>
</div>
  )
}
