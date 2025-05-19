import { useStoreCart } from "../../../store/useStoreCart"
import { useStoreCheckout } from "../../../store/useStoreCheckout"
import { FormCheckout } from "../FormCheckout/FormCheckout"
import { FormSended } from "../FormSended/FormSended"
import { SummaryCheckout } from "../SummaryCheckout/SummaryCheckout"
import styles from "./PayCheckout.module.css"

export const PayCheckout = () => {
  const cantProducts = useStoreCart(state => state.cantProducts())
  const totalCart = useStoreCart(state => state.totalCart())
  const {validFormSumbited} = useStoreCheckout()

  return (
    <>
    <div className={styles.titleScreen}>
        <h2>PAGAR</h2>
        {cantProducts > 1 
        ? <p>({cantProducts} productos) ${totalCart}</p> 
        : <p>({cantProducts} producto) ${totalCart}</p>}
    </div>

    <div className={styles.mainContainer}>
        {validFormSumbited 
        ? <FormSended></FormSended>
        :<FormCheckout></FormCheckout>
}
        <SummaryCheckout></SummaryCheckout>
    </div>


    
    </>
  )
}
