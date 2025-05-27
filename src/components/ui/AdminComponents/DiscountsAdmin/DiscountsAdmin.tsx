import { useEffect, useState } from 'react'
import styles from './DiscountsAdmin.module.css'
import { IDiscount } from '../../../../types/IDiscount'
import { useStoreModal } from '../../../../store/useStoreModal'
import { AdminDsicounts } from '../../Modals/AdminDiscounts/AdminDiscounts'
import { useStoreDiscount } from '../../../../store/useStoreDiscount'
import { IPrice } from '../../../../types/IPrice'
import { getAllPrices } from '../../../../cruds/crudPrices'
import { deleteDiscount } from '../../../../cruds/crudDiscount'



export const DiscountsAdmin = () => {

    
    const {modalAdminDiscount, openModalAdminDiscount} = useStoreModal()
    const {discounts, fetchDiscount, setActiveDiscount} = useStoreDiscount()
    const [prices, setPrices] = useState<IPrice[]>()

    useEffect(() => {
        const getPrices = async () => {
            const pricesFetched = await getAllPrices()
            setPrices(pricesFetched)
        }
        getPrices()
        fetchDiscount()
    },[])

    const handleEdit = (discount : IDiscount) => {
        openModalAdminDiscount(2)
        setActiveDiscount(discount)
    }

    const handleDelete = async(discountId : number) => {

        try {
            const discounInPrice = prices?.some(price => price.discount?.id === discountId)
            if(discounInPrice){
                alert('El descuento se encuentra asignado a un precio')
                return
            }

            const deletedDiscount = await deleteDiscount(String(discountId))
            alert('Se elimino el descuento')
            console.log(deletedDiscount);
            fetchDiscount() // Actualiza el estado
        } catch (error : any) {
            alert('No se puede eliminar el descuento')
            console.log(error.message);
            
        }
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
                                <button onClick={() => handleDelete(discount.id!)}>Eliminar</button>
                            </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
        {modalAdminDiscount.type && <div className={styles.modalBAckdrop}><AdminDsicounts/></div>}
        </div>
    )
}