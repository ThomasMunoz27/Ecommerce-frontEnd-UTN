
import { useEffect, useState } from 'react'
import { useStoreModal } from '../../../../store/useStoreModal'
import { useStoreUsers } from '../../../../store/useStoreUsers'


import style from './AdminEditUser.module.css'
import { getAllSizes } from '../../../../cruds/crudSize'
import { ISize } from '../../../../types/ISize'

import {  IAdressRequest } from '../../../../types/IAdress'

import { IUserRequest } from '../../../../types/IUser'
import { Rol } from '../../../../types/enums/Rol'
import { errorAlert } from '../../../../utils/errorAlert'
import { SubAdminAddress } from '../SubAdminAddress/SubAdminAddress'
import { putAdress } from '../../../../cruds/crudAddress'
import { updateUser } from '../../../../cruds/crudUsers'
import { succesAlert } from '../../../../utils/succesAlert'


export const AdminEditUser = () => {

    const {activeUser} = useStoreUsers()
    const {closeAdminModalEditUser, openSubAdminAddress, modalAdminSubAddress} = useStoreModal()
    const {fetchUsers} = useStoreUsers()


    const [sizes, setSizes] = useState<ISize[]>()

    // objeto direccion que voy a actualizar 
    const [address, setAddress] = useState<IAdressRequest>({
        id: activeUser?.adress.id || null,
        street: activeUser?.adress.street || '',
        number: activeUser?.adress.number || 0,
        cp: activeUser?.adress.cp || 0,
        locality: {id : activeUser?.adress.locality.id || 0}

    })

    const [editUser , setEditUser] = useState<IUserRequest>({
        id: activeUser?.id,
        name: activeUser?.name || '',
        lastname: activeUser?.lastname || '',
        username: activeUser?.username || '',
        password: activeUser?.password || '',
        birthdate : activeUser?.birthdate || new Date(),
        phoneNumber: activeUser?.phoneNumber || 0,
        user: activeUser?.user ? Rol.admin : Rol.user ,
        email: activeUser?.email || '',
        dni: activeUser?.dni || '',
        adress: {id : address.id || 0},
        size : {id : Number(activeUser?.size.id) || 0},
        active : activeUser?.active || false,
        sex : activeUser?.sex || ''
    })

    useEffect(() => {
        const getEntities = async() => {
            const sizesFetched = await getAllSizes()
            setSizes(sizesFetched)
        }
        getEntities()
    },[])



    
    
    // Manejo de datos de user
    const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (!editUser) {
            errorAlert('Error', 'No hay usuario seleccionado')
            return
        }

        const {name, value} = e.target

        setEditUser((prev) => ({
            ...prev,
            [name] : value
        }))
    }
    
    const handleSubmit = async(e : React.FormEvent) => {
        e.preventDefault()
        if (!activeUser || !editUser || !address){
            errorAlert('Error', 'Ocurrio un error en el manejo de datos')
            return
        }
        try {
            await putAdress(address)
            await updateUser(editUser)
            succesAlert('Actualizado', 'Se actualizaron los datos exitosamente')
            fetchUsers("active")
            closeAdminModalEditUser()

        } catch (error : any) {

            errorAlert('Error', 'No se pudieron actualizar los datos del usuario')
            console.log(error.message);
            closeAdminModalEditUser()
            
        }
    }


    return (
        <div className={style.containerPrincipal}>
            <h1>Editar Usuario</h1>
            <form action="" onSubmit={handleSubmit}>
                <div className={style.containerValues}>

                    <div className={style.column}>
                        <label htmlFor="">Nombre</label>
                        <input type="text" name="name" id="" value={editUser?.name} onChange={handleChange}/>

                        <label htmlFor="">Apellido</label>
                        <input type="text" name="" id="" value={editUser?.lastname} onChange={handleChange}/>

                        <label htmlFor="">Nombre Usuario</label>
                        <input type="text" name="username" id="" value={editUser?.username!} onChange={handleChange}/>

                        <label htmlFor="">Fecha de Nacimiento</label>
                        <input type="date" name="birthdate" id="" value={editUser?.birthdate ? new Date(editUser.birthdate).toISOString().split('T')[0] : ''} onChange={handleChange}/>

                        <label htmlFor="">Numero de Telefono</label>
                        <input type="number" name="phoneNumber" id="" value={editUser?.phoneNumber} onChange={handleChange}/>

                    </div>


                    <div className={style.column}>
                        <label htmlFor="">Rol</label>
                        <select name="user" id="" value={editUser?.user} onChange={handleChange}>
                            <option value="" disabled selected>Sin seleccion</option>
                            <option value={Rol.admin}>Admin</option>
                            <option value={Rol.user}>User</option>
                        </select>

                        <label htmlFor="">Email</label>
                        <input type="text" name="email" id="" value={editUser?.email} onChange={handleChange}/>

                        <label htmlFor="">DNI</label>
                        <input type="number" name="dni" id="" value={editUser?.dni} onChange={handleChange}/>


                        <label htmlFor="">Talle</label>
                        <select name="size" id="" value={editUser?.size.id} onChange={handleChange}>
                            {sizes?.map((size) => (
                                <option key={size.id} value={size.id}>{size.size}</option>
                            ))}
                        </select>

                        <label htmlFor="">Sexo</label>
                        <select name="sex" id="" value={editUser?.sex} onChange={handleChange}>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                            <option value="Otro">Otro</option>
                        </select>

                        <button type='button' onClick={openSubAdminAddress}>Manejo de direccion</button>

                    </div>

                </div>

                <div className={style.containerButtons}>
                    <button onClick={closeAdminModalEditUser}>Cancelar</button>
                    <button type='submit'>Aceptar</button>
                </div>

            </form>
            {modalAdminSubAddress && <div className={style.modalBackdrop}><SubAdminAddress address={address} setAddress={setAddress}/></div>}
        </div>
    )
}