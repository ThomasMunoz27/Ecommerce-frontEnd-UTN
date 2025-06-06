import { useEffect } from 'react'
import styles from './LocalitiesAdmin.module.css'
import { useStoreLocality } from '../../../../store/useStoreLocalities'
import { succesAlert } from '../../../../utils/succesAlert'
import { errorAlert } from '../../../../utils/errorAlert'
import { deleteLocality } from '../../../../cruds/crudLocality'
import { useStoreModal } from '../../../../store/useStoreModal'
import { ILocality } from '../../../../types/ILocality'
import { AdminLocalities } from '../../Modals/AdminLocalities/AdminLocalities'

export const LocalitiesAdmin = () => {

    const {fetchLocality, localities, setActiveLocality} = useStoreLocality()
    const {openModalAdminLocality, modalAdminLocality} = useStoreModal()

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


    const handleAddModal = () => {
        setActiveLocality(null)
        openModalAdminLocality()
    }

    const handleEditModal = (locality : ILocality) => {
        setActiveLocality(locality)
        openModalAdminLocality()
    }

    return (
        <div className={styles.containerPrincipal}>
            <div className={styles.containerTitleAndButton}>
                <div className={styles.containerTitle}>
                    <h1>Gestión de Localidades</h1>
                </div>
                <div className={styles.containerButtons}>
                    <button onClick={() => handleAddModal()}>
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
                                <button onClick={() => handleEditModal(locality)}>Editar</button>
                                <button onClick={() => handleDelete(String(locality.id))}>Eliminar</button>
                            </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {modalAdminLocality && <div className={styles.modalBackdrop}><AdminLocalities/></div>}
        </div>
    )
}