import { useEffect } from 'react'
import styles from './LocalitiesAdmin.module.css'
import { useStoreLocality } from '../../../../store/useStoreLocalities'
import { succesAlert } from '../../../../utils/succesAlert'
import { errorAlert } from '../../../../utils/errorAlert'
import { deleteLocality } from '../../../../cruds/crudLocality'

export const LocalitiesAdmin = () => {

    const {fetchLocality, localities} = useStoreLocality()

    useEffect(() => {
        fetchLocality()
    },[])
    
    const handleDelete = async(localityId : string) => {

        try {
            await deleteLocality(localityId)
            succesAlert('Eliminado', 'Se elimino correctamente la localidad')
            fetchLocality()
        } catch (error : any) {
            console.log(error.message);
            errorAlert('Error', 'No se pudo eliminar la localidad')
        }
    }

    return (
        <div className={styles.containerPrincipal}>
            <div className={styles.containerTitleAndButton}>
                <div className={styles.containerTitle}>
                    <h1>Gestión de Localidades</h1>
                </div>
                <div className={styles.containerButtons}>
                    <button >
                        Añadir
                    </button>
                </div>
            </div>
            <div className={styles.localityTable}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Provincia</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {localities?.map(locality => (
                    <tr key={locality.id}>
                        <td>{locality.id}</td>
                        <td >{locality.name}</td>
                        <td>{locality.province.name}</td>
                        
        
                        <td>
                            <div className={styles.actionButtons}>
                                <button >Editar</button>
                                <button onClick={() => handleDelete(String(locality.id))}>Eliminar</button>
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