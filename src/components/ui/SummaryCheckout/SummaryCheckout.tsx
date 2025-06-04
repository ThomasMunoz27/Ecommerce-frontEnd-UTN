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
        const totalCartWithDiscount = useStoreCart(state => state.totalCartWithDiscount())

        const [noDiscountIvaPrice, setNoDiscountIvaPrice] = useState(0)

        useEffect(() => {
        if(totalCartWithDiscount === 0){
            setIvaPrice(totalCart * 1.21)
        }else{
            setIvaPrice(totalCartWithDiscount * 1.21)
            setNoDiscountIvaPrice(totalCart * 1.21)
        }
        }, [totalCart, totalCartWithDiscount])

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
                                {totalCartWithDiscount != 0 && (
                                    <>
                                    <p>Precio original:</p>
                                    <p className={styles.aplicatedDiscount}>Descuento total:</p>
                                    </>
                                )}
                                <p><b>Total:</b></p>
                                <div className={styles.extraInfo}>
                                    <p>(precio sin impuestos ${totalCartWithDiscount == 0 ? totalCart : totalCartWithDiscount})</p>
                                    <p>(IVA incluido ${((totalCartWithDiscount == 0 ? totalCart : totalCartWithDiscount) * 0.21).toFixed(2)})</p>
                                </div>
                            </div>

                            <div className={styles.priceSide}>
                                <p>$ {ivaPrice}</p>
                                {totalCartWithDiscount != 0 && (
                                    <>
                                        <p>$ {noDiscountIvaPrice}</p>
                                        <p className={styles.aplicatedDiscount}>- $ {(noDiscountIvaPrice-ivaPrice).toFixed(2)}</p>
                                    </>
                                )}
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
