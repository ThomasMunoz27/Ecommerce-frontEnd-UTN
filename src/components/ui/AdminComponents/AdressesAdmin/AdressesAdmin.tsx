import { useEffect } from 'react'
import styles from './AdressesAdmin.module.css'
import { useStoreAdress } from '../../../../store/useStoreAdresses'
import { deleteAdress} from '../../../../cruds/crudAddress'
import { succesAlert } from '../../../../utils/succesAlert'
import { errorAlert } from '../../../../utils/errorAlert'
import { useStoreModal } from '../../../../store/useStoreModal'
import { IAdress } from '../../../../types/IAdress'
import { AdminAddresses } from '../../Modals/AdminAddresses/AdminAddresses'



export const AdressesAdmin = () => {

    const {fetchAdress, adresses, setActiveAdress} = useStoreAdress()
    const {openModalAdminAdress, modalAdminAdress} = useStoreModal()

    useEffect(() => {
        fetchAdress()
    },[])

    const handleAddModal = () => {
        setActiveAdress(null)
        openModalAdminAdress()
    }

    const handleEditModal = (address : IAdress) => {
        setActiveAdress(address)
        openModalAdminAdress()
    }

    const handleDelete = async(idAdress : string) => {
        try {
            await deleteAdress(idAdress)
            succesAlert('Eliminado', 'Se elimino la direccion exitosamente')
            fetchAdress()
        } catch (error  :any) {
            console.log(error.message);
            errorAlert('Error', 'No se pudo eliminar la direccion')
        }
    }

    return (
        <div className={styles.containerPrincipal}>
            <div className={styles.containerTitleAndButton}>
                <div className={styles.containerTitle}>
                    <h1>Gestión de Direcciones</h1>
                </div>
                <div className={styles.containerButtons}>
                    <button onClick={() => handleAddModal()}>
                        Añadir
                    </button>
                </div>
            </div>
            <div className={styles.adressTable}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Codigo Postal</th>
                        <th>Numero</th>
                        <th>Calle</th>
                        <th>Localidad</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {adresses?.map(adress => (
                    <tr key={adress.id}>
                        <td>{adress.id}</td>
                        <td >{adress.cp}</td>
                        <td>{adress.number}</td>
                        <td>{adress.street}</td>
                        <td>{adress.locality?.name}</td>
                        
                        <td>
                            <div className={styles.actionButtons}>
                                <button onClick={() => handleEditModal(adress)}>Editar</button>
                                <button onClick={() => handleDelete(String(adress.id))}>Eliminar</button>
                            </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {modalAdminAdress && <div className={styles.modalBackdrop}><AdminAddresses/></div>}
        </div>
    )
}