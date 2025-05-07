import { useStoreModal } from '../../../store/useStoreModal'
import { useStoreUsers } from '../../../store/useStoreUsers'
import styles from './ProfileDetails.module.css'

export const ProfileDetails = () => {

    const {openModalEditLogin} = useStoreModal()
    const {users} = useStoreUsers()
    const user = users[0] // Agarro cualquiera

    return (
        <div className={styles.containerPrincipal}>

            {/* Muestra datos resumidos en la izquierda */}
            <div className={styles.userSummary}>
                <div className={styles.containerPhoto}>
                    <div className={styles.photo}>
                        <img src='' alt="" />
                    </div>
                </div>
                <div className={styles.containerNameAndEmailSummary}>
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                </div>
                <div className={styles.containerButtonSummary}>
                    <button>
                        Cerrar Sesion
                        <span className="material-symbols-outlined">
                            keyboard_double_arrow_right
                        </span>
                    </button>
                </div>
            </div>

            {/* Muestra datos de la derecha */}
            <div className={styles.containerData}>
                <div className={styles.containerTitleData}>
                    <h1>Mis Datos</h1>
                    <p>En este apartado puede visualizar y  modificar sus datos</p>
                </div>
                <div className={styles.containerContentData}>
                    <h1>Resumen</h1>
                    <p>Nombre: {user.name}</p>
                    <p>Fecha de Naciemiento : {user.dni}</p>
                    <p>Sexo : {}</p>
                    <p className={styles.edit} onClick={() => openModalEditLogin(1)}>Editar</p>
                </div>
                <div className={styles.containerAccessData}>
                    <h1>Datos de Acceso</h1>
                    <p>Correo Electronico: {user.email}</p>
                    <p>Contraseña: {user.password}</p>
                    <p className={styles.edit} onClick={() => openModalEditLogin(2)}>Editar</p>
                </div>
                <div className={styles.containerButtonData}>
                    <p>Si eliminas la cuenta perderas todos los datos que tengas vinculado a nuestros servicios</p>
                    <button>
                        Eliminar Cuenta
                        <span className="material-symbols-outlined">
                            delete
                        </span>
                    </button>
                </div>
            </div>

        </div>
    )
}