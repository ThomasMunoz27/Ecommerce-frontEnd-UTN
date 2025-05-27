import { useEffect, useState } from 'react'
import styles from './SizesAdmin.module.css'
import { ISize } from '../../../../types/ISize'
import { deleteSize } from '../../../../cruds/crudSize'
import { useStoreModal } from '../../../../store/useStoreModal'
import { AdminSize } from '../../Modals/AdminSize/AdminSize'
import { useStoreSize } from '../../../../store/useStoreSize'


export const SizesAdmin = () => {
    
    const {sizes, fetchSize} = useStoreSize()
    const {openModalAdminSize, modalAdminSize} = useStoreModal()
    const [selectedSize, setSelectedSize] = useState<ISize>()

    useEffect(() => {
        fetchSize()
    },[])


    
    const handleDelete = async(sizeId : string) => {
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