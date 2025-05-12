import { useStoreCart } from '../../../store/useStoreCart'
import { Header } from '../../ui/Headers/Header/Header'
import { Footer } from '../../ui/footer/Footer'
import { EmptyCart } from '../../ui/Cart/EmptyCart/EmptyCart'
import { CartWithProducts } from '../../ui/Cart/CartWithProducts/CartWithProducts'
import styles from './CartScreen.module.css'


export const CartScreen = () => {

    const {productsInCart} = useStoreCart()

  return (
    <>
    <div className={styles.mainContainer}>

      <Header></Header>
      <div className={styles.cartContent}>
        {productsInCart.length === 0 
        ? (
            <EmptyCart></EmptyCart>
        )
        : (

            <div>
                <CartWithProducts></CartWithProducts>
            </div>

        )
        }

      </div>

      <Footer></Footer>
    </div>
    </>
  )
}
