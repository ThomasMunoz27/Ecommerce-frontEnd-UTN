import { FormCheckout } from "../FormCheckout/FormCheckout"
import styles from "./PayCheckout.module.css"

export const PayCheckout = () => {
  return (
    <>
    <div className={styles.titleScreen}>
        <h2>PAGAR</h2>
        <p>[x productos] $[monto]</p>
    </div>

    <div>
        <FormCheckout></FormCheckout>
    </div>


    
    </>
  )
}
