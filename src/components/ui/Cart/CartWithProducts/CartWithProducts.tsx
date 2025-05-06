import { useStoreCart } from '../../../../store/useStoreCart'
import styles from './CartWithProducts.module.css'

export const CartWithProducts = () => {
    const {productsInCart} = useStoreCart()
    const cantProducts = productsInCart.length
  return (
    <>
        <div className={styles.mainContainer}>
            <div className={styles.productsOfCart}>
                <h2>Tu Carrito</h2>
                <p>Total {cantProducts > 1 
                ? `[${cantProducts} productos]`
                : `[${cantProducts} producto]`
                }</p>


            </div>
            <div className={styles.cartSummary}>

                <h4>Resumen del Pedido</h4>

                <div className={styles.infoSide}>
                    <p>{cantProducts > 1 
                    ? `${cantProducts} productos`
                    : `${cantProducts} producto`
                    }</p>
                </div>

                <div className={styles.priceSide}>
                    $
                </div>
            </div>
            <div className={styles.otherProducts}></div>
        </div>
    </>
  )
}
