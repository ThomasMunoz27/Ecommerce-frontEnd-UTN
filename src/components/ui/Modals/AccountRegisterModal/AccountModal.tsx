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
                    <div className={styles.data}>
                        <div className={styles.loginDetails}>
                            <h3>Datos de acceso</h3>
                            <input type="text" name="" id=""  placeholder='Nombre de Usuario'/>
                            <input type="text" name="" id=""  placeholder='Correo'/>
                            <input type="text" name="" id=""  placeholder='Contraseña'/>
                            <input type="text" name="" id=""  placeholder='Repita la contraseña'/>
                        </div>
                        <div className={styles.taxData}>
                            <h3>Datos Fiscales</h3>
                            <input type="text" name="" id="" placeholder='Nombre'/>
                            <input type="text" name="" id="" placeholder='Apellido'/>
                            <input type="text" placeholder='Fecha Nacimiento'/>
                            <input type="text" name="" id=""  placeholder='DNI'/>
                            <input type="text" name="" id="" placeholder='Direccion'/>
                        </div>

                    </div>
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