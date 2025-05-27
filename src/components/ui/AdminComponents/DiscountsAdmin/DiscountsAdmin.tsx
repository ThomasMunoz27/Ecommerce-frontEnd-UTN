import { useEffect, useState } from 'react'
import styles from './DiscountsAdmin.module.css'
import { IDiscount } from '../../../../types/IDiscount'
import { getAllDiscounts } from '../../../../cruds/crudDiscount'
import { useStoreModal } from '../../../../store/useStoreModal'
import { AdminDsicounts } from '../../Modals/AdminDiscounts/AdminDiscounts'



export const DiscountsAdmin = () => {

    const [discounts, setDiscounts] = useState<IDiscount[]>()
    const {modalAdminDiscount, openModalAdminDiscount} = useStoreModal()
    const [selectedDiscount, setSelectedDiscount] = useState<IDiscount>()

    useEffect(() => {
        const getDiscounts = async() => {
            const discountsFetched = await getAllDiscounts()
            setDiscounts(discountsFetched)
        }
        getDiscounts()
    },[discounts])

    const handleEdit = (discount : IDiscount) => {
        openModalAdminDiscount(2)
        setSelectedDiscount(discount)
    }

    return(
        <div className={styles.containerPrincipal}>
            <div className={styles.containerPrincipal}>
            <div className={styles.containerTitleAndButton}>
                <div className={styles.containerTitle}>
                    <h1>Gestión de Descuentos</h1>
                </div>
                <div className={styles.containerButtons}>
                    <button onClick={() => openModalAdminDiscount(1)}>
                        Añadir
                    </button>
                </div>
            </div>
        <div className={styles.discountsTable}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Fecha Desde</th>
                        <th>Fecha Hasta</th>
                        <th>Descripcion</th>
                        <th>Precio promocional</th>
                        <th>Hora desde</th>
                        <th>Hora Hasta</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {discounts?.map((discount) => (
                    <tr key={discount.id}>
                        <td>{discount.id}</td>
                        <td>{discount.name}</td>
                        <td>{discount.dateTo}</td>
                        <td>{discount.dateFrom}</td>
                        <td>{discount.discountDescription}</td>
                        <td>{discount.promotionalPrice}</td>
                        <td>{discount.timeTo}</td>
                        <td>{discount.timeFrom}</td>
                        
                        <td>
                            <div className={styles.actionButtons}>
                                <button onClick={() => handleEdit(discount)}>Editar</button>
                                <button >Eliminar</button>
                            </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
        {modalAdminDiscount.type && <div className={styles.modalBAckdrop}><AdminDsicounts discount={selectedDiscount}/></div>}
        </div>
    )
}