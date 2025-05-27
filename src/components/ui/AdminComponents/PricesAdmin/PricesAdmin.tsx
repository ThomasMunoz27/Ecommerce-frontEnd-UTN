import { useEffect, useState } from 'react'
import styles from './PricesAdmin.module.css'
import { deletePrice } from '../../../../cruds/crudPrices'
import { useStorePrice } from '../../../../store/useStorePrice'
import { getAllProducts } from '../../../../cruds/crudProduct'
import { IProduct } from '../../../../types/IProduct'
import { useStoreModal } from '../../../../store/useStoreModal'
import { AdminPrice } from '../../Modals/AdminPrice/AdminPrice'
import { IPrice } from '../../../../types/IPrice'
import { errorAlert } from '../../../../utils/errorAlert'
import { succesAlert } from '../../../../utils/succesAlert'

export const PricesAdmin = () => {

    
    const {fetchPrice, prices, setActivePrice} = useStorePrice()
    const [products, setProducts] = useState<IProduct[]>()
    const {modalAdminPrice, openModalAdminPrice} = useStoreModal()

    useEffect(() => {
        const getProducts = async() => {
            const productsFetched = await getAllProducts()
            setProducts(productsFetched)
        }
        getProducts()
        fetchPrice()
    },[])


    const handleEdit = (price : IPrice) => {
        openModalAdminPrice(2)
        setActivePrice(price)
    }

    const handleDelete = async(priceId : number) => {
        const pricesInProducts = products?.some(product => 
            product.prices.id === priceId
        )

        if(pricesInProducts){
            
            errorAlert('Error', 'El precio se encuentra asignado a un producto')
            return
        }
        try {
            const deletedPrice = await deletePrice(String(priceId))
            console.log(deletedPrice);
            
            succesAlert('Eliminado', 'Se elimino el precio exitosamente')
            fetchPrice()
            
        } catch (error : any) {
            alert('No se pudo eliminar el precio')
            console.log(error.message);
            
        }
    }
    

    return (
        <div className={styles.containerPrincipal}>
            <div className={styles.containerTitleAndButton}>
                <div className={styles.containerTitle}>
                    <h1>Gestión de Precios</h1>
                </div>
                <div className={styles.containerButtons}>
                    <button onClick={() => openModalAdminPrice(1)}>
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
                                <button onClick={() => handleEdit(price)}>Editar</button>
                                <button onClick={() => handleDelete(price.id!)}>Eliminar</button>
                            </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {modalAdminPrice.type && <div className={styles.modalBackdrop}><AdminPrice/></div>}
        </div>
    )
}