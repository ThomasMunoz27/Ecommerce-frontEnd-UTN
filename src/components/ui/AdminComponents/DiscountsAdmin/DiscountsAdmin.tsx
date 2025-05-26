import { useEffect, useState } from 'react'
import styles from './DiscountsAdmin.module.css'
import { IDiscount } from '../../../../types/IDiscount'
import { getAllDiscounts } from '../../../../cruds/crudDiscount'



export const DiscountsAdmin = () => {

    const [discounts, setDiscounts] = useState<IDiscount[]>()

    useEffect(() => {
        const getDiscounts = async() => {
            const discountsFetched = await getAllDiscounts()
            setDiscounts(discountsFetched)
        }
        getDiscounts()
    },[discounts])

    return(
        <div className={styles.containerPrincipal}>
            <div className={styles.containerPrincipal}>
            <div className={styles.containerTitleAndButton}>
                <div className={styles.containerTitle}>
                    <h1>Gestión de Descuentos</h1>
                </div>
                <div className={styles.containerButtons}>
                    <button>
                        Añadir
                    </button>
                </div>
            </div>
        <div className={styles.productsTable}>
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
                                <button >Editar</button>
                                <button >Eliminar</button>
                            </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
        </div>
    )
}