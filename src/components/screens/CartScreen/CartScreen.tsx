import { useStoreCart } from '../../../store/useStoreCart'
import { Header } from '../../ui/Header/Header'
import { Footer } from '../../ui/footer/Footer'
import { EmptyCart } from '../../ui/EmptyCart/EmptyCart'



export const CartScreen = () => {

    const {productsInCart} = useStoreCart()

  return (
    <>
    <Header></Header>
    {productsInCart.length === 0 
    ? (
        <EmptyCart></EmptyCart>
    )
    : (

        <div>
            <h2>Tu carrito</h2>
        </div>

    )
    }

    <Footer></Footer>
    </>
  )
}
