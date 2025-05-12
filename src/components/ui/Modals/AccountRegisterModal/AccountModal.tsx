import styles from './AccountModal.module.css'
import { useStoreModal } from '../../../../store/useStoreModal'

export const AccountModal = () => {

    const {modalAccount, closeModalAccount} = useStoreModal()


    if(modalAccount.type){
        return( // Modal para login
            <div className={styles.containerPrincipalLogin}>
                <div className={styles.containerLogoLogin}>
                    <img src="./img/Logo.png" alt="" />
                </div>
                <form action="" className={styles.containerFormLogin}>
                    <input type="text" name="" id=""  placeholder='Usuario'/>
                    <input type="text" name="" id=""  placeholder='Ingrese su contraseña'/>
                    <div className={styles.containerButtonsLogin}>
                        <button>Cancelar</button>
                        <button>Iniciar Sesion</button>
                    </div>
                    <hr />
                </form>
                <div className={styles.register}>
                    <p>¿No estás registrado?</p>
                    <p className={styles.textCahnge} onClick={()=>closeModalAccount}>Crear Cuenta</p>
                </div>
            </div>
        )


    }else{ // Valores del Modal para agregar un nuevo user


        return (
            <div className={styles.containerPrincipalRegister}>
                <div className={styles.containerLogoRegister}>
                    <img src="./img/Logo.png" alt="" />
                </div>
                <div className={styles.containerTitleRegister}>
                    <h1>REGISTRO DE CUENTA</h1>
                </div>
            
                <form action="" className={styles.containerFormRegister}>
                    <input type="text" name="" id=""  placeholder='Usuario'/>
                    <input type="text" name="" id=""  placeholder='Ingrese su correo'/>
                    <input type="text" name="" id=""  placeholder='Ingrese su contraseña'/>
                    <input type="text" name="" id=""  placeholder='Repita la contraseña'/>
                    <hr />
                    <div className={styles.containerButtonsRegister}>
                        <button>Cancelar</button>
                        <button>Crear Cuenta</button>
                    </div>
                </form>            
            </div>
        )
    }
}