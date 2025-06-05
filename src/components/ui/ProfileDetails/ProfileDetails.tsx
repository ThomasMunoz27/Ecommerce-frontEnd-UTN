
import { useEffect } from 'react'
import { useStoreModal } from '../../../store/useStoreModal'
import styles from './ProfileDetails.module.css'
import { getAllUsers } from '../../../cruds/crudUsers'
import { useStoreUsers } from '../../../store/useStoreUsers'

export const ProfileDetails = () => {

    const {setUser, user} = useStoreUsers()

    useEffect(() => {
        const fetchUsers = async() => {
            const arrayUsers = await getAllUsers()
            setUser(arrayUsers[1])
        }
        
        fetchUsers()
    },[])

    console.log(user)

    const {openModalEditLogin} = useStoreModal()

    return (
        <div className={styles.containerPrincipal}>

            {/* Muestra datos resumidos en la izquierda */}
            <div className={styles.userSummary}>
                <div className={styles.containerPhoto}>
                    <div className={styles.photo}>
                        {/* <img src='' alt="" /> */}
                    </div>
                </div>
                <div className={styles.containerNameAndEmailSummary}>
                    <p>{user?.name} {user?.lastname}</p>
                    <p>{user?.email}</p>
                </div>
                <div className={styles.containerButtonSummary}>
                    <button>
                        Cerrar Sesion
                        <span className="material-symbols-outlined">
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
                    <p>Nombre: {user?.name}</p>
                    <p>Fecha de Naciemiento : {user?.birthdate ? new Date(user.birthdate).toLocaleDateString() : 'No disponible'}</p>
                    <p>Direccion: {user?.adress.street} {user?.adress.number}</p>
                    <p>Sexo : {user?.sex}</p>
                    <p className={styles.edit} onClick={() => openModalEditLogin(1)}>Editar datos fiscales</p>
                </div>
                <div className={styles.containerAccessData}>
                    <h1>Datos de Acceso</h1>
                    <p>Correo Electronico: {user?.email}</p>
                    <p>Nombre de usuario: {user?.username}</p>
                    <p>Contraseña: {user?.password}</p>
                    <p className={styles.edit} onClick={() => openModalEditLogin(2)}>Editar contraseña</p>
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