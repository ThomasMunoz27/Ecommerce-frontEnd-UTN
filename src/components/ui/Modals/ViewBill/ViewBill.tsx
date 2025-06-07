import { useStoreBill } from '../../../../store/useStoreBill'
import { useStoreModal } from '../../../../store/useStoreModal'
import { downloadBill } from '../../../../utils/downloadBill'
import styles from './ViewBill.module.css'


export const ViewBill = () => {



    const {closeModalViewBill} = useStoreModal()
    const {activeBill} = useStoreBill()

    return (

        <div className={styles.allContainer}>
        <div className={styles.containerPrincipal} id='bill'>
            <div className={styles.minheader}>
                <div className={styles.delete}>
                    <span onClick={closeModalViewBill} className="material-symbols-outlined disguiseInPdf">
                        close
                    </span>
                </div>
            </div>

            <div className={styles.containerBillType}>
                <p className={styles.containerLetter}><strong>B</strong></p>
                <p>CODIGO NRO.06</p>
            </div>

            <div className={styles.containerEnterprise}>
                <div className={styles.containerLogo}>
                    <img src="./img/Logo.png" alt="Logo" />
                </div>

                <div>
                    <h2>CAMPEONES.COM</h2>
                    <p>Dirección de la Empresa</p>
                    <p>CUIT: 30-00000000-0</p>
                    <p>INICIO ACTIVIDAD: 7/06/2025</p>
                </div>
            </div>

            <hr />

            <div className={styles.containerClient}>
                <h3>Factura Nº {activeBill?.id}</h3>
                <p><strong>Cliente:</strong> {activeBill?.buyerName}</p>
                <p><strong>DNI:</strong> {activeBill?.buyerDni}</p>
                <p><strong>Dirección:</strong> {activeBill?.user?.adress.street} {activeBill?.user?.adress.number}</p> 
                <p><strong>Fecha:</strong> {activeBill?.datePurchase}</p>
            </div>

            <div className={styles.containerTable}>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Descripcion</th>
                            <th>Cantidad</th>
                            <th>Precio Unitario</th>
                            <th>Subtotal</th>   
                        </tr>
                    </thead>

                    <tbody>
                        {activeBill?.details.map(detail => (
                            <tr key={detail.id}>
                                <td>{detail.id}</td>
                                <td>{detail.product.name}</td>
                                <td>{detail.quantity}</td>
                                <td>{detail.unitPrice}</td>
                                <td>{detail.subtotal}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

            <div className={styles.containerTotals}>
                <div className={styles.totalContainer}>
                    <p>Descuento aplicado: ${activeBill?.totalDiscount ? activeBill.totalDiscount : 0}</p>
                    <p>Total: ${activeBill?.total}</p>
                </div>

            </div>

        
        </div>
            <div className={styles.buttonDownload}>
                <button onClick={downloadBill}>Descargar</button>
            </div>
        </div>
    )
}