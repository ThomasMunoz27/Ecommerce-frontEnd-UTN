import { useStoreCart } from '../../../store/useStoreCart'
import { Header } from '../../ui/Headers/Header/Header'
import { Footer } from '../../ui/footer/Footer'
import { EmptyCart } from '../../ui/Cart/EmptyCart/EmptyCart'
import { CartWithProducts } from '../../ui/Cart/CartWithProducts/CartWithProducts'



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
            <CartWithProducts></CartWithProducts>
        </div>

    )
    }

    <Footer></Footer>
    </>
  )
}
