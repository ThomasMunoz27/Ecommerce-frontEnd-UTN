import { useEffect, useState } from 'react'
import styles from './SummaryCheckout.module.css'
import { useStoreCart } from '../../../store/useStoreCart'
import { CardProductInCheckout } from '../CardProductInCheckout/CardProductInCheckout'
import { Link } from 'react-router'


export const SummaryCheckout = () => {

        const {productsInCart} = useStoreCart()
        const cantProducts = useStoreCart(state => state.cantProducts())
        const totalCart = useStoreCart(state => state.totalCart())
    
        const [ivaPrice, setIvaPrice] = useState(0)
    
        useEffect(() => {
            setIvaPrice(totalCart * 1.21)
        }, [totalCart])

  return (
    <>
        <div className={styles.paymentContainer}>
                <div className={styles.cartSummary}>
                    <div className={styles.headerSummary}>
                        <h3>Tu pedido</h3>
                        <Link to="/my-cart" className={styles.editBuy}>Editar</Link>
                    </div>

                    <div className={styles.summaryContainer}>
                        
                        <div className={styles.infoContainer}>
                            <div className={styles.infoSide}>
                                <p>{cantProducts > 1 
                                ? `${cantProducts} productos`
                                : `${cantProducts} producto`
                                }</p>
                                <p>Entrega</p>
                                <p><b>Total:</b></p>
                                <div className={styles.extraInfo}>
                                    <p>(precio sin impuestos ${totalCart})</p>
                                    <p>(IVA incluido ${totalCart * 0.21})</p>
                                </div>
                            </div>

                            <div className={styles.priceSide}>
                                <p>$ {totalCart}</p>
                                <p>$[precio_entrega]</p>
                                <p><b>${ivaPrice}</b></p>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className={styles.cardsContainer}>
                    {
                        productsInCart.map((product) => (
                            <CardProductInCheckout productInCart={product} key={`${product.id}-${product.size.id}-${product.color.id}`} />
                        ))
                    }
                </div>
        </div>
    </>
  )
}
