import styles from './AccountModal.module.css'
import { useStoreModal } from '../../../../store/useStoreModal'

import { login } from '../../../../cruds/crudLoginRegister'
import { useState } from 'react'
import { useStoreLogin } from '../../../../store/useStoreLogin'

export const AccountModal = () => {

    const {modalAccount, closeModalAccount} = useStoreModal()

    // Login
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {setToken} = useStoreLogin()
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
    direccion: ''
    })

  const handleRegisterChange = (e: any) => {
  const { name, value } = e.target
  setRegisterData(prev => ({ ...prev, [name]: value }))
}


    if(modalAccount.type){
        return( // Modal para login
            <div className={styles.containerPrincipalLogin}>
                <div className={styles.containerLogoLogin}>
                    <img src="./img/Logo.png" alt="" />
                </div>
                <form  className={styles.containerFormLogin}>
                    <input type="text" name="" id=""  placeholder='Usuario' value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <input type="text" name="" id=""  placeholder='Ingrese su contraseña' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <div className={styles.containerButtonsLogin}>
                        <button>Cancelar</button>
                        <button onClick={(e) => {
                            e.preventDefault()
                            login(username, password, setToken)
                        }}>Iniciar Sesion</button>
                    </div>
                    <hr />
                </form>
                <div className={styles.register}>
                    <p>¿No estás registrado?</p>
                    <p className={styles.textCahnge} onClick={closeModalAccount}>Crear Cuenta</p>
                </div>
            </div>
        )


    }else{ // Valores del Modal para agregar un nuevo user


        return (
            <div className={styles.containerPrincipalRegister}>
                <div className={styles.containerLogoRegister}>
                    <img src="./img/Logo.png" alt="" className={styles.imgLogo} />
                </div>
                <div className={styles.containerTitleRegister}>
                    <h1>REGISTRO DE CUENTA</h1>
                </div>
            
                <form action="" className={styles.containerFormRegister}>
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
/><input
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

                        </div>

                    </div>
                    <hr />
                    <div className={styles.containerButtonsRegister}>
                        <button>Cancelar</button>
                        <button onClick={(e) => {
                            console.log(registerData)
                        }}>Crear Cuenta</button>
                    </div>
                </form>            
            </div>
        )
    }
}