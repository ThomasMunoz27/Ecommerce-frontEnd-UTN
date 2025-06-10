import styles from './AccountModal.module.css'
import { useStoreModal } from '../../../../store/useStoreModal'
import { login, register } from '../../../../cruds/crudLoginRegister'
import { useEffect, useState } from 'react'
import { useStoreLogin } from '../../../../store/useStoreLogin'
import { useStoreUsers } from '../../../../store/useStoreUsers'
import { getUserByName } from '../../../../cruds/crudUsers'
import { errorAlert } from '../../../../utils/errorAlert'


export const AccountModal = () => {
  const { modalAccount, closeModalAccount, openModalAccount} = useStoreModal()

  // Login
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { setToken } = useStoreLogin()
  
  const { setUser, setUserName, userName} = useStoreUsers()
  
  const [logged, setLogged] = useState(false)

  


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
    sex: ''
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

  if (modalAccount.type) {
    return (
      <div className={styles.containerPrincipalLogin}>
        <div className={styles.containerLogoLogin}>
          <img src="./img/Logo.png" alt="" />
        </div>
        <form className={styles.containerFormLogin } onSubmit={async (e) => {
      e.preventDefault()
      await login(username, password, setToken)
      localStorage.setItem('username', username)
      setUserName(username)
  }}>
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

        <form className={styles.containerFormRegister}  onSubmit={async (e) => {
    e.preventDefault()
    if (registerData.password !== registerData.repeatPassword) {
      alert('Las contraseñas no coinciden')
      return
    }
    try {
      await register(
        registerData.nombre,
        registerData.password,
        registerData.email,
        registerData.dni,
        registerData.username,
        registerData.fechaNacimiento,
        registerData.apellido,
        parseInt(registerData.phoneNumber),
        registerData.sex
      )
      closeModalAccount()
      await login(registerData.username, registerData.password, setToken)
      localStorage.setItem('username', registerData.username)
      setUserName(registerData.username)
    } catch (error: unknown) {
      if (error instanceof Error) console.error(error.message)
    }
  }}>
          <div className={styles.data}>
            <div className={styles.loginDetails}>
              <h3>Datos de acceso</h3>
              <input
                type="text"
                name="username"
                placeholder="Nombre de Usuario"
                value={registerData.username}
                onChange={handleRegisterChange}
              />
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
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={registerData.nombre}
                onChange={handleRegisterChange}
              />
              <input
                type="text"
                name="apellido"
                placeholder="Apellido"
                value={registerData.apellido}
                onChange={handleRegisterChange}
              />
              <input
                type="date"
                name="fechaNacimiento"
                value={registerData.fechaNacimiento}
                onChange={handleRegisterChange}
              />
              <input
                type="text"
                name="dni"
                placeholder="DNI"
                value={registerData.dni}
                onChange={handleRegisterChange}
              />
              <input
                type="text"
                name="direccion"
                placeholder="Dirección"
                value={registerData.direccion}
                onChange={handleRegisterChange}
              />
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Teléfono"
                value={registerData.phoneNumber}
                onChange={handleRegisterChange}
              />
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
      </div>
    )
  }
}
