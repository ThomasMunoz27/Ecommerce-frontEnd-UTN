import { useEffect, useState } from 'react'
import styles from './UserAdmin.module.css'



import { useStoreUsers } from '../../../../store/useStoreUsers'
import { deleteUser } from '../../../../cruds/crudUsers'
import { succesAlert } from '../../../../utils/succesAlert'


export const UsersAdmin = () => {

    const [active, setActive] = useState<string>('active')
    const {users, fetchUsers} = useStoreUsers()

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


    return(
        <div className={styles.containerPrincipal}>
            <div className={styles.containerTitleAndButton}>
                <div className={styles.containerTitle}>
                    <h1>Gestion de Usuarios</h1>
                </div>
                <div className={styles.containerButtons}>
                    <button onClick={() => handleState('active')}>Activos</button>
                    <button onClick={() => handleState('inactive')}>Inactivos</button>
                    <button onClick={() => handleState('alls')}>Todos</button>
                    <button>Añadir</button>
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
                                        <button>
                                            {user.active}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}