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
    const {sizes, fetchSize, setActiveSize} = useStoreSize()
    const {openModalAdminSize, modalAdminSize} = useStoreModal()
    

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

        const sizeInUser = users?.some(user => user.size.id === sizeId) // Para saber si hay algun talle asignado a un usuario
        const sizeInProduct = products?.some(product =>  // Para saber si hay algun talle asignado a un producto
            product.sizes.some(size => size.id === sizeId)
        )

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
        setActiveSize(size)
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
        {modalAdminSize.type === true && <div className={styles.modalBackdrop}><AdminSize/></div>}
        </div>
    )
}