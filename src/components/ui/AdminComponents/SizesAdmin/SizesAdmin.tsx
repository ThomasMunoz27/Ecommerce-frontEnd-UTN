import { useEffect, useState } from 'react'
import styles from './SizesAdmin.module.css'
import { ISize } from '../../../../types/ISize'
import { deleteSize } from '../../../../cruds/crudSize'
import { useStoreModal } from '../../../../store/useStoreModal'
import { AdminSize } from '../../Modals/AdminSize/AdminSize'
import { useStoreSize } from '../../../../store/useStoreSize'
import { IUser } from '../../../../types/IUser'
import { getAllUsers } from '../../../../cruds/crudUsers'
import { getAllProducts } from '../../../../cruds/crudProduct'
import { IProduct } from '../../../../types/IProduct'


export const SizesAdmin = () => {
    
    const [users, setUsers] = useState<IUser[]>()
    const [products, setProducts] = useState<IProduct[]>() 
    const [sizesProducts, setSizesProduct] = useState<ISize[]>() // Estado para ver los talles dentro de un producto
    const [sizeInProduct, setSizeInProduct] = useState<boolean>() // Estado para ver si esta el talle seleccionadp en un producto
    const {sizes, fetchSize} = useStoreSize()
    const {openModalAdminSize, modalAdminSize} = useStoreModal()
    const [selectedSize, setSelectedSize] = useState<ISize>()

    useEffect(() => {
        const getEntities = async() => {
            const usersFetched = await getAllUsers()
            const productsFetched = await getAllProducts()
            setUsers(usersFetched)
            setProducts(productsFetched)
        }
        getEntities()
        fetchSize()
    },[])


    
    const handleDelete = async(sizeId : string) => {

        // Busco los talles en productos
        products?.map(product => {
            setSizesProduct(product.sizes)
        })

        sizesProducts?.map(size => {
            const existSizeInProduct = size.id === sizeId // Veo si dentro del array de talles del producto se encuentra el talle
            if (existSizeInProduct){
                setSizeInProduct(existSizeInProduct) // Se lo asigno al estado
            }
        })
        
        const sizeInUser = users?.some(user => user.size.id === sizeId) // Para saber si hay algun talle asignado a un usuario

        if (sizeInUser || sizeInProduct){
            alert('El talle se encuentra asignado a un usuario o a un producto')
            return
        }

        try {
            const deletedSize = await deleteSize(sizeId)
            console.log(sizeId);
            
            console.log(deletedSize);
            
            alert('Se elimino el talle')

            fetchSize()
        } catch (error : any) {
            alert('Ocurrio un error')
            console.log(error.message);
        }
    }

    const handleEditSize = (size : ISize) => {
        openModalAdminSize(2)
        setSelectedSize(size) 
    }

    return (
        <div className={styles.containerPrincipal}>
            <div className={styles.containerTitleAndButton}>
                <div className={styles.containerTitle}>
                    <h1>Gestión de Talles</h1>
                </div>
                <div className={styles.containerButtons}>
                    <button onClick={() => openModalAdminSize(1)}>
                        Añadir
                    </button>
                </div>
            </div>
        <div className={styles.sizeTable}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Talle</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {sizes?.map((size) => (
                    <tr key={size.id}>
                        <td>{size.id}</td>
                        <td>{size.size}</td>
                        
                        <td>
                            <div className={styles.actionButtons}>
                                <button onClick={() => handleEditSize(size)}>Editar</button>
                                <button onClick={() => handleDelete(size.id!)}>Eliminar</button>
                            </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {modalAdminSize.type === true && <div className={styles.modalBackdrop}><AdminSize size={selectedSize}/></div>}
        </div>
    )
}