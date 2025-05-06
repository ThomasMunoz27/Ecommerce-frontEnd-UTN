import { useStoreModal } from '../../../../store/useStoreModal'
import styles from './EditLoginDataModal.module.css'

export const EditLoginDataModal = () => {

    const {modalEditLogin, closeModalEditLogin} = useStoreModal() // Llamo a la store para controlar que modal se renderiza

    if (modalEditLogin.option == 2){
        return (
            <div className={styles.containerPrincipalPassword}>
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


    } else if(modalEditLogin.option == 1) {

        
        return (
            <div className={styles.containerPrincipalData}>
                <h2>Editar datos fiscales</h2>
                <input type="text" name="" id="" required placeholder='Nombre'/>
                <input type="text" name="" id="" required placeholder='Apellido'/>
                <h3>Fecha de nacimiento</h3>
                <div className={styles.containerBirthDate}>
                    <input type="text" placeholder='dd'/>
                    <input type="text" name="" id=""  placeholder='mm'/>
                    <input type="text" placeholder='yyy'/>
                </div>
                <h3>Sexo</h3>
                <div className={styles.containerSex}>
                    <input type="checkbox" />
                    <label htmlFor="">Hombre</label>
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="">Mujer</label>
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="">Otro</label>
                </div>
                <button className={styles.buttonConfirm}>
                    Guardar Cambios
                </button>
                <button className={styles.buttonCancel} onClick={closeModalEditLogin}>
                    Cancelar
                </button>

            </div>
        )
    }

}