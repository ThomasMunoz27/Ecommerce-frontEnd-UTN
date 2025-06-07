import { useEffect, useState } from 'react'
import styles from './ProvincesAdmin.module.css'
import { useStoreProvince } from '../../../../store/useStoreProvince'
import { deleteProvince } from '../../../../cruds/crudProvince'
import { succesAlert } from '../../../../utils/succesAlert'
import { errorAlert } from '../../../../utils/errorAlert'
import { useStoreModal } from '../../../../store/useStoreModal'
import { AdminProvince } from '../../Modals/AdminProvince/AdminProvince'
import { IProvince } from '../../../../types/IProvince'
import { getAllLocalities } from '../../../../cruds/crudLocality'
import { ILocality } from '../../../../types/ILocality'

export const ProvincesAdmin = () => {

    const {fetchProvince, provinces, setActiveProvince} = useStoreProvince()
    const {modalAdminProvince, openModalAdminProvince} = useStoreModal()
    const [localities, setLocalities] = useState<ILocality[]>()

    useEffect(() => {
        const getEntities = async() => {
            const localitiesFetched = await getAllLocalities()
            setLocalities(localitiesFetched)
        }
        getEntities()
        fetchProvince()
    },[])

    const handleDelete = async(provinceId : string) => {
    
        const existInLocality = localities?.find((locality) => locality.province.id === Number(provinceId))
        if (existInLocality) { 
            errorAlert('Error', 'Una localidad depende de esta provincia')
            return
        }

        try {
            await deleteProvince(provinceId)
            succesAlert('Eliminado', 'Se elimino correctamente la provincia')
            fetchProvince()
        } catch (error : any) {
            console.log(error.message);
            errorAlert('Error', 'No se pudo eliminar la provincia')
        }
    }

    const handleEditModal = (province : IProvince) => {
        openModalAdminProvince()
        setActiveProvince(province)
    }

    const handleAddModal = () => {
        openModalAdminProvince()
        setActiveProvince(null)
    }
    
    return (
        <div className={styles.containerPrincipal}>
            <div className={styles.containerTitleAndButton}>
                <div className={styles.containerTitle}>
                    <h1>Gestión de Provincias</h1>
                </div>
                <div className={styles.containerButtons}>
                    <button onClick={() => handleAddModal()}>
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
                                <button onClick={() => handleEditModal(province)}>Editar</button>
                                <button onClick={() => handleDelete(String(province.id))}>Eliminar</button>
                            </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {modalAdminProvince && <div className={styles.modalBackdrop}><AdminProvince/></div>}
        </div>
    )
}