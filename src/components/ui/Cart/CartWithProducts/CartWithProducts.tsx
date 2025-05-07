import { Link } from 'react-router'
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

                <div className={styles.summaryContainer}>
                    <div className={styles.infoSide}>
                    <h4>Resumen del Pedido</h4>
                        <p>{cantProducts > 1 
                        ? `${cantProducts} productos`
                        : `${cantProducts} producto`
                        }</p>
                        <p>Entrega</p>
                        <p><b>Total</b></p>

                        <p>(precio sin impuestos $[monto])</p>
                        <p>(IVA incluido $[monto])</p>
                    </div>

                    <div className={styles.priceSide}>
                        <p>$ [precio total]</p>
                        <p>[precio entrega]</p>
                        <p><b>[monto total]</b></p>
                    </div>
                </div>
                    <Link to="/" className={styles.goToPayButton}>Ir a pagar <img src="src\assets\arrow_right.svg" alt="flecha" /></Link>
            </div>
            <div className={styles.otherProducts}></div>
        </div>
    </>
  )
}
