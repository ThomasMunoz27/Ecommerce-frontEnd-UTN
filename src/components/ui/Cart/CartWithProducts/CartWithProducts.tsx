import { Link } from 'react-router'
import { useStoreCart } from '../../../../store/useStoreCart'
import styles from './CartWithProducts.module.css'
import { CardProductInCart } from '../../CardProductInCart/CardProductInCart'
import { useEffect, useState } from 'react'
import { useStoreUsers } from '../../../../store/useStoreUsers'
import { getAllUsers } from '../../../../cruds/crudUsers'

export const CartWithProducts = () => {
const {setUser} = useStoreUsers()

    const {productsInCart} = useStoreCart()
    const cantProducts = useStoreCart(state => state.cantProducts())

    const totalCart = useStoreCart(state => state.totalCart())

    const totalCartWithDiscount = useStoreCart(state => state.totalCartWithDiscount())

    const [noDiscountIvaPrice, setNoDiscountIvaPrice] = useState(0)
    const [ivaPrice, setIvaPrice] = useState(0)

    useEffect(() =>  {
        if(totalCartWithDiscount === 0){
            setIvaPrice(totalCart * 1.21)
        }else{
            setIvaPrice(totalCartWithDiscount * 1.21)
            setNoDiscountIvaPrice(totalCart * 1.21)
        }

        //esta funcion despues se saca
        const fetchUsers = async() => {
                    const arrayUsers = await getAllUsers()
                    setUser(arrayUsers[0])
                }
                
                fetchUsers()

        
    }, [totalCart, totalCartWithDiscount])

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
                        <CardProductInCart productInCart={product} key={`${product.id}-${product.size.id}-${product.color.id}`} />
                        
                    ))
                }

            </div>
            <div className={styles.rightSide}>
                
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
                                <p>$ {(ivaPrice).toFixed(2)}</p>
                                {totalCartWithDiscount != 0 && (
                                    <>
                                        <p>$ {noDiscountIvaPrice}</p>
                                        <p className={styles.aplicatedDiscount}>- $ {(noDiscountIvaPrice-ivaPrice).toFixed(2)}</p>
                                    </>
                                )}
                                <p><b>${(ivaPrice).toFixed(2)}</b></p>
                            </div>
                        </div>
                    </div>
                    <Link to="/checkout" className={styles.goToPayButton} >Ir a pagar <img src="src\assets\arrow_right.svg" alt="flecha" /></Link>
                </div>
                
                <div className={styles.payMethods}>
                    <p className={styles.payMethodsTitle}>Metodos de pago</p>
                    <div className={styles.payMethodsImgs}>
                        <img className={styles.mercadoPago} src="src\assets\MercadoPago_(Horizontal).svg" alt="MercadoPago" />
                        <img src="src/assets/visa_logo.png" alt="" className={styles.visa}/>
                        <img src="src\assets\Mastercard-logo.svg" alt="" className={styles.mastercard}/>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
