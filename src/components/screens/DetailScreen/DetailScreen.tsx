import useStoreProduct from "../../../store/useStoreProduct";
import { Footer } from "../../ui/footer/Footer";
import { Header } from "../../ui/Headers/Header/Header";
import style from "./DetailScreen.module.css"
export const DetailScreen = () => {

    // Producto activo

    const {activeProduct} = useStoreProduct()

  return (
    <>
    <Header/>
        <div className={style.hero}>
            <div className={style.imgContainer}>
                <img src={activeProduct?.image.url} alt="" className={style.productImg} />
            </div>
            <div className={style.textContainer}>
                <h1 className={style.textTitle}>{activeProduct?.name}</h1>
                <p className={style.productCategory}>{activeProduct?.category.name}</p>
                <p className={style.productPrice}>${activeProduct?.prices.salePrice}</p>

                <div className={style.sizeSection}>
                <h3>Talles:</h3>
                <div className={style.sizeContainer}>

                    {activeProduct?.sizes.map((size) => (<p className={style.sizeTag}>{size.size}</p>))}
                </div>
                </div>
                
                <button className={style.buyButton}>Añadir al carrito</button>
            </div>
        </div>
    <Footer/>
    </>
  );
};