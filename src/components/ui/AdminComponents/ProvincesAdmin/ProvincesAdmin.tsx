import { useEffect } from 'react'
import styles from './ProvincesAdmin.module.css'
import { useStoreProvince } from '../../../../store/useStoreProvince'

export const ProvincesAdmin = () => {

    const {fetchProvince, provinces} = useStoreProvince()

    useEffect(() => {
        fetchProvince()
    },[])
    
    return (
        <div className={styles.containerPrincipal}>
            <div className={styles.containerTitleAndButton}>
                <div className={styles.containerTitle}>
                    <h1>Gestión de Provincias</h1>
                </div>
                <div className={styles.containerButtons}>
                    <button >
                        Añadir
                    </button>
                </div>
            </div>
            <div className={styles.provincesTable}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Pais</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {provinces?.map(province => (
                    <tr key={province.id}>
                        <td>{province.id}</td>
                        <td >{province.name}</td>
                        <td>{province.country.name}</td>
                        
        
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