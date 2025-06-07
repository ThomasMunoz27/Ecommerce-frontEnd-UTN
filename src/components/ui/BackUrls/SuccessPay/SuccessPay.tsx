import { Link, useNavigate } from "react-router"
import { Footer } from "../../footer/Footer"
import { Header } from "../../Headers/Header/Header"
import styles from "./SuccessPay.module.css"
import { useEffect } from "react"
import { setConfirmedBill } from "../../../../cruds/payActions"
export const SuccessPay = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const preferenceId = urlParams.get("preference_id")

        if(preferenceId){
            const confirmBill = async () =>{
                try{
                    await setConfirmedBill(preferenceId)

                }catch (error){
                    navigate("/failure")
                }
            }
            confirmBill()
        }
    }, [])

  return (
    <>
        <Header></Header>
        <div className={styles.mainContainer}>
            <div className={styles.successContainer}>
                <h2>Gracias por tu compra!!!</h2>

                <p>Recibiras un correo con tu comprobante de compra</p>

            </div>
            <div className={styles.otherProducts}>
                <h4>Hecha un vistazo a otros productos que podrian interesarte</h4>

                <Link to="/" className={styles.button}>Ver productos <img src="src\assets\arrow_right.svg" alt="flecha" /></Link>
            </div>
        </div>
        
        <Footer></Footer>
    </>
)
}
