import { useEffect } from 'react'
import { useStoreCountry } from '../../../../store/useStoreCountry'
import styles from './CountryAdmin.module.css'
import { errorAlert } from '../../../../utils/errorAlert'
import { deleteCountry } from '../../../../cruds/crudCountry'
import { succesAlert } from '../../../../utils/succesAlert'
import { useStoreModal } from '../../../../store/useStoreModal'
import { AdminCountry } from '../../Modals/AdminCountry/AdminCountry'
import { ICountry } from '../../../../types/ICountry'

export const CountryAdmin = () => {

    const {countries, fetchCountry, setActiveCountry} = useStoreCountry()
    const {modalAdminCountry, openModalAdminCountry} = useStoreModal()

    useEffect(() => {
        fetchCountry()
    },[])

    const handleDelete = async(countryId : string) => {
        try {
            await deleteCountry(countryId)
            succesAlert('Elimindo', 'Se elimino correctamente el pais')
            fetchCountry()
        } catch (error : any) {
            console.log(error.message);
            errorAlert('Error', 'No se pudo eliminar el pais')
        }
    }

    const handleEditModal = (country : ICountry) => {
        setActiveCountry(country)
        openModalAdminCountry()
    }

    const handleAddModal = () => {
        setActiveCountry(null)
        openModalAdminCountry()
    }

    return(
        <div className={styles.containerPrincipal}>
            <div className={styles.containerTitleAndButton}>
                <div className={styles.containerTitle}>
                    <h1>Gestión de Paises</h1>
                </div>
                <div className={styles.containerButtons}>
                    <button onClick={() => handleAddModal()}>
                        Añadir
                    </button>
                </div>
            </div>
            <div className={styles.countryTable}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {countries?.map((country) => (
                    <tr key={country.id}>
                        <td>{country.id}</td>
                        <td>{country.name}</td>
                        
                        <td>
                            <div className={styles.actionButtons}>
                                <button onClick={() => handleEditModal(country)}>Editar</button>
                                <button onClick={() => handleDelete(String(country.id))}>Eliminar</button>
                            </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {modalAdminCountry && <div className={styles.modalBackdrop}><AdminCountry/></div>}
        </div>
    )
}