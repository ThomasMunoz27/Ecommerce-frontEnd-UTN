import { useStoreCart } from "../../../store/useStoreCart"
import { FormCheckout } from "../FormCheckout/FormCheckout"
import { SummaryCheckout } from "../SummaryCheckout/SummaryCheckout"
import styles from "./PayCheckout.module.css"

export const PayCheckout = () => {
  const cantProducts = useStoreCart(state => state.cantProducts())
  const totalCart = useStoreCart(state => state.totalCart())


  return (
    <>
    <div className={styles.titleScreen}>
        <h2>PAGAR</h2>
        {cantProducts > 1 
        ? <p>{cantProducts} productos ${totalCart}</p> 
        : <p>{cantProducts} producto ${totalCart}</p>}
    </div>

    <div className={styles.mainContainer}>
        <FormCheckout></FormCheckout>
        <SummaryCheckout></SummaryCheckout>
    </div>


    
    </>
  )
}
