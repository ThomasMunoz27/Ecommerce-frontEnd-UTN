import { useStoreCart } from "../../../store/useStoreCart"
import { useStoreCheckout } from "../../../store/useStoreCheckout"
import { FormCheckout } from "../FormCheckout/FormCheckout"
import { FormSended } from "../FormSended/FormSended"
import { SummaryCheckout } from "../SummaryCheckout/SummaryCheckout"
import styles from "./PayCheckout.module.css"

export const PayCheckout = () => {
  const cantProducts = useStoreCart(state => state.cantProducts())
  const totalCart = useStoreCart(state => state.totalCart()*1.21)
  const totalCartWithDiscount = useStoreCart(state => state.totalCartWithDiscount()*1.21)
  const {validFormSumbited} = useStoreCheckout()


  

  return (
    <>
    <div className={styles.titleScreen}>
        <h2>PAGAR</h2>
        {cantProducts > 1 
        ? <p>({cantProducts} productos) ${(totalCartWithDiscount == 0 ? totalCart : totalCartWithDiscount)}</p> 
        : <p>({cantProducts} producto) ${(totalCartWithDiscount == 0 ? totalCart : totalCartWithDiscount)}</p>}
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
