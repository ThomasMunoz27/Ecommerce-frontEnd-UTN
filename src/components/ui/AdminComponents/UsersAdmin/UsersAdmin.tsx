import { useEffect, useState } from 'react'
import styles from './UserAdmin.module.css'



import { useStoreUsers } from '../../../../store/useStoreUsers'
import { deleteUser } from '../../../../cruds/crudUsers'
import { succesAlert } from '../../../../utils/succesAlert'
import { IUser } from '../../../../types/IUser'
import { useStoreModal } from '../../../../store/useStoreModal'
import { AdminEditUser } from '../../Modals/EditRol/AdminEditUser'
import { AdminAddUser } from '../../Modals/AdminAddUser/AdminAddUser'






export const UsersAdmin = () => {

    const [active, setActive] = useState<string>('active')
    const {users, fetchUsers, setActiveUser} = useStoreUsers()
    const {modalAdminEditUser,modalAdminAddUser,  openAdminModalEditUser, openAdminAddUser} = useStoreModal()

    useEffect(() => {
        fetchUsers(active)
        
    },[active])

    const handleState = (state : string) => {
        setActive(state)
        console.log(active);
        
    }

    const handleDelete = async(userId : number) => {
        try {
            await deleteUser(userId)
            succesAlert('Eliminado', 'Se dio de baja al usuario efectivamente')
            fetchUsers(active)

        } catch (error : any) {
            console.log(error.message);

        }
    }

    // Funcion para editar usuario
    const handleEditUser = (user : IUser) => {
        setActiveUser(user)
        openAdminModalEditUser()
    }

    


    return(
        <div className={styles.containerPrincipal}>
            <div className={styles.containerTitleAndButton}>
                <div className={styles.containerTitle}>
                    <h1>
                        {active == 'active' && 'Gestion de Usuarios Activos'}
                        {active == 'inactive' && 'Gestion de Usuarios Inactivos'}
                        {active == 'alls' && 'Gestion de Todos Usuarios'}
                    </h1>
                </div>
                <div className={styles.containerButtons}>
                    <button onClick={() => handleState('active')}>Activos</button>
                    <button onClick={() => handleState('inactive')}>Inactivos</button>
                    <button onClick={() => handleState('alls')}>Todos</button>
                    <button onClick={openAdminAddUser}>Añadir</button>
                </div>
            </div>
            <div className={styles.usersTable}>
                <table className={styles.table}>

                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Contraseña</th>
                            <th>Nombre de usuario</th>
                            <th>Email</th>
                            <th>DNI</th>
                            <th>Telefono</th>
                            <th>Direccion</th>
                            <th>Talle</th>
                            <th>Rol</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.lastname}</td>
                                <td>{user.password}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.dni}</td>
                                <td>{user.phoneNumber}</td>
                                <td>{user.adress.street} {user.adress.number} ({user.adress.locality.name})</td>
                                <td>{user.size.size}</td>
                                <td>{user.user}</td>
                                <td>
                                    <div className={styles.actionButtons}>
                                        <button onClick={() => handleDelete(user.id)}>
                                            Eliminar
                                        </button>
                                        <button onClick={() =>handleEditUser(user) }>
                                            Editar
                                        </button>
                                        
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {modalAdminEditUser && <div className={styles.modalBackdrop}><AdminEditUser/></div>}
            {modalAdminAddUser && <div className={styles.modalBackdrop}><AdminAddUser/></div>}
            
        </div>
    )
}