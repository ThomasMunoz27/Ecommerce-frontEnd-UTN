import styles from './AccountModal.module.css'
import { useStoreModal } from '../../../../store/useStoreModal'
import { login, register } from '../../../../cruds/crudLoginRegister'
import React, { useEffect, useState } from 'react'
import { useStoreLogin } from '../../../../store/useStoreLogin'
import { useStoreUsers } from '../../../../store/useStoreUsers'
import { getUserByName } from '../../../../cruds/crudUsers'
import { errorAlert } from '../../../../utils/errorAlert'
import { formUserRegisterSchema } from '../../../../yupSchemas/formUserRegisterSchema'
import { postAdress } from '../../../../cruds/crudAddress'
import { IAdressRequest } from '../../../../types/IAdress'
import { SubAdminAddress } from '../SubAdminAddress/SubAdminAddress'



export const AccountModal = () => {
  const { modalAccount, closeModalAccount, openModalAccount} = useStoreModal()

  // Login
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { setToken } = useStoreLogin()
  
  const { setUser, setUserName,} = useStoreUsers()
  const {modalAdminSubAddress, openSubAdminAddress} = useStoreModal()
  
  
  const [logged] = useState(false)


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
    addressId: 0
  
  })
        //Direccion
      const [newAddress, setNewAddress] = useState<IAdressRequest>({
          street: '',
          number: 0,
          cp: 0,
          locality: {id : 0}
      })

  

      useEffect(() => {
          const fetchUser = async() => {
              const usuarioName = localStorage.getItem('username')
              if(usuarioName){
                  const usuario = await getUserByName(usuarioName) 
                  setUser(usuario)
              }
          } 
          fetchUser()
      }, [username])
  const handleRegisterChange = (e: any) => {
    const { name, value } = e.target
    setRegisterData(prev => ({ ...prev, [name]: value }))
  }

  const handleLogin = async (e: React.FormEvent) => {
          e.preventDefault()

        await login(username, password, setToken)
        localStorage.setItem('username', username)
        setUserName(username)
  }

  const handleSubmit = async (e: React.FormEvent) =>{
    e.preventDefault()
    try {
    
    
      const registerReq = await register(registerData.username, registerData.password, registerData.email, registerData.dni, registerData.username, registerData.fechaNacimiento, registerData.apellido, registerData.phoneNumber, registerData.sex)
      console.log(registerReq)

      closeModalAccount()
      await login(registerData.username, registerData.password, setToken)
      localStorage.setItem('username', registerData.username)
      setUserName(registerData.username)      
    } catch (error) {
      console.error('error', error)
    }

    
  }

  if (modalAccount.type) {
    return (
      <div className={styles.containerPrincipalLogin}>
        <div className={styles.containerLogoLogin}>
          <img src="./img/Logo.png" alt="" />
        </div>
        <form className={styles.containerFormLogin } onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className={styles.containerButtonsLogin}>
            <button type='button' onClick={((e) => {
              e.preventDefault()
              if(!logged){
                errorAlert('Espera un momento', 'Primero debes iniciar sesión')
              }
            })}>Cancelar</button>
            <button type='submit'>
              Iniciar Sesión
            </button>
          </div>
          <hr />
        </form>
        <div className={styles.register}>
          <p>¿No estás registrado?</p>
          <p className={styles.textCahnge} onClick={closeModalAccount}>
            Crear Cuenta
          </p>
        </div>
      </div>
    )
  } else {
    return (
      <div className={styles.containerPrincipalRegister}>
        <div className={styles.containerLogoRegister}>
          <img src="./img/Logo.png" alt="" className={styles.imgLogo} />
        </div>
        <div className={styles.containerTitleRegister}>
          <h1>REGISTRO DE CUENTA</h1>
        </div>

        <form className={styles.containerFormRegister}  onSubmit={handleSubmit}>
          <div className={styles.data}>
            <div className={styles.loginDetails}>
              <h3>Datos de acceso</h3>

              <div className={styles.inputContainer}>

              <input
                type="text"
                name="username"
                placeholder="Nombre de Usuario"
                value={registerData.username}
                onChange={handleRegisterChange}
              />
            
              </div>

              <input
                type="email"
                name="email"
                placeholder="Correo"
                value={registerData.email}
                onChange={handleRegisterChange}
              />
              


              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={registerData.password}
                onChange={handleRegisterChange}
              />


              <input
                type="password"
                name="repeatPassword"
                placeholder="Repita la contraseña"
                value={registerData.repeatPassword}
                onChange={handleRegisterChange}
              />


            </div>
            <div className={styles.taxData}>
              <h3>Datos Fiscales</h3>

              <div className={styles.inputContainer}>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  value={registerData.nombre}
                  onChange={handleRegisterChange}
                />

              </div>


              <div className={styles.inputContainer}>

                <input
                  type="text"
                  name="apellido"
                  placeholder="Apellido"
                  value={registerData.apellido}
                  onChange={handleRegisterChange}
                />
                
              </div>


              <div className={styles.inputContainer}>

                <input
                  type="date"
                  name="fechaNacimiento"
                  value={registerData.fechaNacimiento}
                  onChange={handleRegisterChange}
                />
              </div>


              <div className={styles.inputContainer}>

                <input
                  type="text"
                  name="dni"
                  placeholder="DNI"
                  value={registerData.dni}
                  onChange={handleRegisterChange}
                />
                
              </div>


              <div className={styles.inputContainer}>

                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Teléfono"
                  value={registerData.phoneNumber}
                  onChange={handleRegisterChange}
                />
                
              </div>

              <select
                name="sex"
                value={registerData.sex}
                onChange={handleRegisterChange}
              >
                <option value="">Seleccione sexo</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
          </div>

          <hr />
          <div className={styles.containerButtonsRegister}>
            <button type='button' onClick={((e) => {
              e.preventDefault()
              openModalAccount(true)
            })}>Cancelar</button>
            <button type='submit'>
              Crear Cuenta
            </button>
          </div>
        </form>
        { modalAdminSubAddress && <div className={styles.modalBackdrop}><SubAdminAddress address={newAddress} setAddress={setNewAddress}/></div>}
      </div>
    )
  }
}
