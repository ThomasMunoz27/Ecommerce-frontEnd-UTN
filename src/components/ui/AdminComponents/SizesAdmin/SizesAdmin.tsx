import { useEffect, useState } from 'react'
import styles from './SizesAdmin.module.css'
import { ISize } from '../../../../types/ISize'
import { getAllSizes } from '../../../../cruds/crudSize'

export const SizesAdmin = () => {
    const [sizes, setSizes] = useState<ISize[]>()

    useEffect(() => {
        const getSizes = async() => {
            const sizeFetched = await getAllSizes()
            setSizes(sizeFetched)
        }
        getSizes()
    },[])

    return (
        <div className={styles.containerPrincipal}>
            <div className={styles.containerTitleAndButton}>
                <div className={styles.containerTitle}>
                    <h1>Gestión de Talles</h1>
                </div>
                <div className={styles.containerButtons}>
                    <button>
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