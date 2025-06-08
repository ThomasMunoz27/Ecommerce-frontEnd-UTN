import { Link, useNavigate } from "react-router"
import { Footer } from "../../footer/Footer"
import { Header } from "../../Headers/Header/Header"
import styles from "./SuccessPay.module.css"
import { useEffect } from "react"
import { setConfirmedBill } from "../../../../cruds/payActions"
import { ViewBill } from "../../Modals/ViewBill/ViewBill"
import { useStoreModal } from "../../../../store/useStoreModal"
import { getBillByPreferenceId } from "../../../../cruds/crudBill"
import { useStoreBill } from "../../../../store/useStoreBill"
import { useStoreCart } from "../../../../store/useStoreCart"
export const SuccessPay = () => {
    const navigate = useNavigate()

    const {modalViewBill, openModalViewBill} = useStoreModal()
    const {cleanCart} = useStoreCart()

    const{setActiveBill} = useStoreBill()
    const handleShowBill = () => {
        openModalViewBill()
    }

    useEffect(() => {
        cleanCart()
        const urlParams = new URLSearchParams(window.location.search)
        const preferenceId = urlParams.get("preference_id")

        if(preferenceId){
            const confirmBill = async () =>{
                try{
                    await setConfirmedBill(preferenceId)
                    const billConfirmed = await getBillByPreferenceId(preferenceId)
                    setActiveBill(billConfirmed)
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

                <div className={styles.viewBillButton}>
                    <button className={styles.buttonFactura} onClick={handleShowBill}>
                        Ver Factura
                    </button>
                </div>

            </div>
            <div className={styles.otherProducts}>
                <h4>Hecha un vistazo a otros productos que podrian interesarte</h4>

                <Link to="/" className={styles.button}>Ver productos <img src="src\assets\arrow_right.svg" alt="flecha" /></Link>
            </div>
            {modalViewBill && <div className={styles.modalBackdrop}><ViewBill/></div>}
        </div>
        
        <Footer></Footer>
    </>
)
}
