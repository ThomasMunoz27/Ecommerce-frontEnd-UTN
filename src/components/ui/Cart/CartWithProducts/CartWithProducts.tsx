import { Link } from 'react-router'
import { useStoreCart } from '../../../../store/useStoreCart'
import styles from './CartWithProducts.module.css'
import { CardProductInCart } from '../../CardProductInCart/CardProductInCart'
import { useEffect, useState } from 'react'

export const CartWithProducts = () => {
    const {productsInCart} = useStoreCart()
    const cantProducts = productsInCart.map(p => p.quantity).reduce((sum, actVal) => sum + actVal, 0)

    const totalCart = productsInCart.map(p => p.prices.salePrice * p.quantity).reduce((sum, actVal) => sum + actVal, 0)

    const [ivaPrice, setIvaPrice] = useState(0)

    useEffect(() => {
        setIvaPrice(totalCart * 1.21)
    }, [totalCart])

  return (
    <>
        <div className={styles.mainContainer}>
            <div className={styles.productsOfCart}>
                <h2>Tu Carrito</h2>
                <p>Total {cantProducts > 1 
                ? `[${cantProducts} productos]`
                : `[${cantProducts} producto]`
                }</p>
                {
                    productsInCart.map((product) => (
                        <CardProductInCart productId={product.id} key={product.id} />
                    ))
                }

            </div>
            <div className={styles.cartSummary}>

                <div className={styles.summaryContainer}>
                    <div className={styles.title}>
                        <h4>Resumen del Pedido</h4>
                    </div>
                    <div className={styles.infoContainer}>
                        <div className={styles.infoSide}>
                            <p>{cantProducts > 1 
                            ? `${cantProducts} productos`
                            : `${cantProducts} producto`
                            }</p>
                            <p>Entrega</p>
                            <p><b>Total:</b></p>

                            <p>(precio sin impuestos ${totalCart})</p>
                            <p>(IVA incluido ${totalCart * 0.21})</p>
                        </div>

                        <div className={styles.priceSide}>
                            <p>$ {totalCart}</p>
                            <p>$[precio_entrega]</p>
                            <p><b>${ivaPrice}</b></p>
                        </div>
                    </div>
                </div>
                    <Link to="/" className={styles.goToPayButton}>Ir a pagar <img src="src\assets\arrow_right.svg" alt="flecha" /></Link>
            </div>
            <div className={styles.otherProducts}></div>
        </div>
    </>
  )
}
