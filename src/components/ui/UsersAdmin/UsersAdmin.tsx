import { useEffect, useState } from 'react'
import styles from './UserAdmin.module.css'
import { getAllUsers } from '../../../cruds/crudUsers'
import { IUser } from '../../../types/IUser'

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
            <div className={styles.containerTitle}>
                <h1>Gestion de Usuarios</h1>
            </div>
            <div className={styles.usersTable}>
                <table className={styles.table}>

                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Id</th>
                            <th>contraseña</th>
                            <th>email</th>
                            <th>DNI</th>
                            <th>Direccion</th>
                            <th>Talle</th>
                            <th>Rol</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.id}</td>
                                <td>{user.password}</td>
                                <td>{user.email}</td>
                                <td>{user.dni}</td>
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