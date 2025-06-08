import { useEffect } from 'react'
import styles from './BillAdmin.module.css'
import { useStoreBill } from '../../../../store/useStoreBill'
import { useStoreModal } from '../../../../store/useStoreModal'
import { ViewBill } from '../../Modals/ViewBill/ViewBill'
import { IBill } from '../../../../types/IBIll'



export const BillAdmin = () => {

    const {fetchBill, bills, setActiveBill} = useStoreBill()
    const {modalViewBill, openModalViewBill} = useStoreModal()

    useEffect(() => {
        fetchBill()
    },[])

    const handleAdd = (bill : IBill) => {
        setActiveBill(bill)
        openModalViewBill()
    }

    return (
        <div className={styles.containerPrincipal}>
            <div className={styles.containerTitleAndButton}>
                <div className={styles.containerTitle}>
                    <h1>Gestión de Facturas</h1>
                </div>
            </div>
            <div className={styles.billsTable}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Id usuario</th>
                        <th>Nombre comprador</th>
                        <th>DNI comprador</th>
                        <th>Direccion comprador</th>
                        <th>Fecha de la compra</th>
                        <th>Descuento aplicado</th>
                        <th>Confirmacion de pago</th>
                        <th>Total</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {bills?.map((bill) => (
                    <tr key={bill.id}>
                        <td>{bill.id}</td>
                        <td>{bill.user?.id}</td>
                        <td>{bill.buyerName}</td>
                        <td>{bill.buyerDni}</td>
                        <td>{bill.buyerAddress}</td>
                        <td>{bill.datePurchase}</td>
                        <td>{bill.totalDiscount ? bill.totalDiscount : 'Sin descuento'}</td>
                        <td>{bill.confirmed ? 'Si' : 'No'}</td>
                        <td>{bill.total}</td>
                        
                        
                        <td>
                            <div className={styles.actionButtons}>
                                <button onClick={() => handleAdd(bill)}>Ver</button>
                            </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {modalViewBill && <div className={styles.modalBackdrop}><ViewBill/></div>}
        </div>
    )
}