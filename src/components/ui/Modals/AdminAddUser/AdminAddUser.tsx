import React, { useState } from 'react'
import styles from './AdminAddUser.module.css'
import { useStoreModal } from '../../../../store/useStoreModal'
import { errorAlert } from '../../../../utils/errorAlert'
import {  register } from '../../../../cruds/crudLoginRegister'
import { useStoreUsers } from '../../../../store/useStoreUsers'

import { succesAlert } from '../../../../utils/succesAlert'

import { SubAdminAddress } from '../SubAdminAddress/SubAdminAddress'
import { IAdressRequest } from '../../../../types/IAdress'
import { postAdress } from '../../../../cruds/crudAddress'

export const AdminAddUser = () => {

    const {closeAdminAddUser, modalAdminSubAddress, openSubAdminAddress} = useStoreModal()
    const { fetchUsers} = useStoreUsers()


    // Registro
    const [registerData, setRegisterData] = useState({
        username: '',
        email: '',
        password: '',
        repeatPassword: '',
        nombre: '',
        apellido: '',
        fechaNacimiento: '',
        dni: '',
        direccion: '',
        phoneNumber: '',
        sex: '',
        addressId: ''
      })

      //Direccion
    const [newAddress, setNewAddress] = useState<IAdressRequest>({
        street: '',
        number: 0,
        cp: 0,
        locality: {id : 0}
    })


    const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setRegisterData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async(e : React.FormEvent) => {
        e.preventDefault()
        if (registerData.password !== registerData.repeatPassword) {
            errorAlert('Error', 'Las contraseñas no coinciden')
            return
        }
        
            try {

                //const createAddress = await postAdress(newAddress)

                const registerReq = await register(
                    registerData.nombre,
                    registerData.password,
                    registerData.email,
                    registerData.dni,
                    registerData.username,
                    registerData.fechaNacimiento,
                    registerData.apellido,
                    parseInt(registerData.phoneNumber),
                    registerData.sex,
                    //registerData.addressId = createAddress.id
                )
                console.log(registerReq)
                succesAlert('Registrado')
                fetchUsers('alls')
                closeAdminAddUser()
                
            } catch (error: unknown) {

                if (error instanceof Error) console.error(error.message)
            }
    }

    return (
        <div className={styles.containerPrincipalRegister}>
            <div className={styles.containerLogoRegister}>
                <img src="./img/Logo.png" alt="" className={styles.imgLogo} />
            </div>
            <div className={styles.containerTitleRegister}>
                <h1>REGISTRO DE CUENTA</h1>
            </div>
            <form action="" className={styles.containerFormRegister} onSubmit={handleSubmit}>
                <div className={styles.data}>
                    <div className={styles.loginDetails}>
                
                        <h3>Datos de acceso</h3>
                        <input type="text" name="username" placeholder="Nombre de Usuario" value={registerData.username} onChange={handleRegisterChange}/>

                        <input type="email" name="email" placeholder="Correo" value={registerData.email} onChange={handleRegisterChange}/>

                        <input type="password" name="password" placeholder="Contraseña" value={registerData.password} onChange={handleRegisterChange}/>

                        <input type="password" name="repeatPassword" placeholder="Repita la contraseña" value={registerData.repeatPassword} onChange={handleRegisterChange}/>

                        
                    </div>

                    <div className={styles.taxData}>
                        <h3>Datos Fiscales</h3>
                        <input type="text" name="nombre" placeholder="Nombre" value={registerData.nombre} onChange={handleRegisterChange}/>

                        <input type="text" name="apellido" placeholder="Apellido" value={registerData.apellido} onChange={handleRegisterChange}/>

                        <input type="date" name="fechaNacimiento" value={registerData.fechaNacimiento} onChange={handleRegisterChange}/>

                        <input type="text" name="dni" placeholder="DNI" value={registerData.dni} onChange={handleRegisterChange}/>

                        <button type='button' className={styles.buttonAddress} onClick={openSubAdminAddress}>Agregar Direccion</button>

                        <input type="tel" name="phoneNumber" placeholder="Teléfono" value={registerData.phoneNumber} onChange={handleRegisterChange}/>

                        <select name="sex" value={registerData.sex} onChange={handleRegisterChange}>

                            <option value="">Seleccione sexo</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                            <option value="Otro">Otro</option>

                        </select>
                    </div>
                </div>

                <hr />

                <div className={styles.containerButtonsRegister}>
                    <button type='button' onClick={closeAdminAddUser}> Cancelar </button>

                    <button type='submit'> Crear Cuenta </button>
                </div>

            </form>
            { modalAdminSubAddress && <div className={styles.modalBackdrop}><SubAdminAddress address={newAddress} setAddress={setNewAddress}/></div>}
        </div>
    )
}