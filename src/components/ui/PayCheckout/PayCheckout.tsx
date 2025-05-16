import { FormCheckout } from "../FormCheckout/FormCheckout"

export const PayCheckout = () => {
  return (
    <>
    <div>
        <h2>PAGAR</h2>
        <p>[x productos] $[monto]</p>
    </div>

    <div>
        <FormCheckout></FormCheckout>
    </div>


    
    </>
  )
}
