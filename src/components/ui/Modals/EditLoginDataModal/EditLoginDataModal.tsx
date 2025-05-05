import { useStoreModal } from '../../../../store/useStoreModal'
import styles from './EditLoginDataModal.module.css'

export const EditLoginDataModal = () => {

    const {closeModalEditLogin} = useStoreModal()
    return (
        <div className={styles.containerPrincipal}>
            <h2>Editar tu contraseña</h2>
            <input type="text" name="" id="" placeholder='Anterior contraseña' required/>
            <input type="text" name="" id="" placeholder='Nueva contraseña' required/>
            <button className={styles.buttonConfirm}>
                Guardar Cambios
            </button>
            <button className={styles.buttonCancel} onClick={closeModalEditLogin}>
                Cancelar
            </button>
            
        </div>
    )
}