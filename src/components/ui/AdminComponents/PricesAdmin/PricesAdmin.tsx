import { useEffect, useState } from 'react'
import styles from './PricesAdmin.module.css'
import { IPrice } from '../../../../types/IPrice'
import { getAllPrices } from '../../../../cruds/crudPrices'

export const PricesAdmin = () => {

    const [prices, setPrices] = useState<IPrice[]>()

    useEffect(() => {
        const getPrices = async () => {
            const pricesFetched = await getAllPrices()
            setPrices(pricesFetched)
        }
        getPrices()
    },[prices])

    

    return (
        <div className={styles.containerPrincipal}>
            <div className={styles.containerTitleAndButton}>
                <div className={styles.containerTitle}>
                    <h1>Gestión de Precios</h1>
                </div>
                <div className={styles.containerButtons}>
                    <button>
                        Añadir
                    </button>
                </div>
            </div>
        <div className={styles.pricesTable}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Precio de Compra</th>
                        <th>Precio de venta</th>
                        <th>Descuento</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {prices?.map((price) => (
                    <tr key={price.id}>
                        <td>{price.id}</td>
                        <td>{price.purchasePrice}</td>
                        <td>{price.salePrice}</td>
                        <td>{price.discount?.name || 'Sin descuento'}</td>
                        
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
    )
}