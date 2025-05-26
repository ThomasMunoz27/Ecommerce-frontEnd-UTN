import { useEffect, useState } from 'react'
import styles from './UserAdmin.module.css'


import { getAllUsers } from '../../../../cruds/crudUsers'
import { IUser } from '../../../../types/IUser'

export const UsersAdmin = () => {

    const [users, setUsers] = useState<IUser[]>()

    useEffect(() => {
        const getUsers = async() => {
            const usersList = await getAllUsers()
            setUsers(usersList)
        }
        getUsers()
    },[])


    return(
        <div className={styles.containerPrincipal}>
            <div className={styles.containerTitleAndButton}>
                <div className={styles.containerTitle}>
                    <h1>Gestion de Usuarios</h1>
                </div>
                <div className={styles.containerButtons}>
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}