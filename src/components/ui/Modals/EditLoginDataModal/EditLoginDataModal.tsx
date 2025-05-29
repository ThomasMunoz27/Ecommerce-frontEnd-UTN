import { useState } from 'react'
import { useStoreModal } from '../../../../store/useStoreModal'
import { useStoreUsers } from '../../../../store/useStoreUsers'
import styles from './EditLoginDataModal.module.css'
import { updateUser } from '../../../../cruds/crudUsers'
import { IUser } from '../../../../types/IUser'
import { succesAlert } from '../../../../utils/succesAlert'
import { formChangePasswordSchema } from '../../../../yupSchemas/formChangePasswordSchema'
import { errorAlert } from '../../../../utils/errorAlert'

export const EditLoginDataModal = () => {

    const {modalEditLogin, closeModalEditLogin} = useStoreModal() // Llamo a la store para controlar que modal se renderiza

    const{setUser, user} = useStoreUsers()

    //Funciones y constantes para el formulario 1
    const initialValues1 = {
        name: user?.name || "",
        lastName: user?.lastname || "",
        birthdate: user?.birthdate && !isNaN(new Date(user.birthdate).getTime())
			? new Date(user.birthdate).toISOString().split("T")[0]
			: "",
        sex: user?.sex || ""
    }

    const [formValues1, setFormValues1] = useState(initialValues1)

    const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues1({...formValues1, [e.target.name]: e.target.value})
    }


    const handleSendForm1 = async () => {
        if(!user)return;

        const birthdateValue = new Date(formValues1.birthdate);
        
        const updatedUser: IUser ={
            ...user,
            name: formValues1.name,
            lastname: formValues1.lastName,
            birthdate: !isNaN(birthdateValue.getTime())
		? birthdateValue
		: user.birthdate,
            sex: formValues1.sex
        }
        setUser(updatedUser)

        console.log(updatedUser.id)
        await updateUser(updatedUser)
        succesAlert("Datos actualizados!")
    }

    //Funciones y constantes para el Formulario 2
    const initialValues2 = {
        oldPassword: "",
        newPassword: "",
        repeatNewPassword:""
    }
    const [formValues2, setFormValues2] = useState(initialValues2)
    const [formErrors2, setFormErrors2] = useState<Record<string, string>>({})

    const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues2({...formValues2, [e.target.name]: e.target.value})
    }

    const handleSubmit2 = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try{
            if(user?.password !== formValues2.oldPassword){
                errorAlert("Contraseña incorrecta")
            }
            await formChangePasswordSchema.validate(formValues2,{abortEarly: false})
            console.log("Contraseñas validadas")
            

        if(!user) return

        const updatedUser: IUser ={
            ...user,
            password: formValues2.newPassword
        }
        setUser(updatedUser)

        console.log(updatedUser.id)
        await updateUser(updatedUser)
        succesAlert("Datos actualizados!")

        }catch (error: any){
            const errors: Record<string, string> = {}
            error.inner.forEach((validationError:any) =>{
                errors[validationError.path] = validationError.message
            })
            setFormErrors2(errors)
        }
    }

    if (modalEditLogin.option == 2){
        return (
            <div className={styles.containerPrincipalPassword}>
                <form className={styles.formContainer} action="" onSubmit={handleSubmit2}>

                    <h2>Editar tu contraseña</h2>
                    <div>

                        <input type="password" name="oldPassword" id="" placeholder='Anterior contraseña' value={formValues2.oldPassword} onChange={handleChange2}/>
                        {formErrors2.oldPassword && <p className={styles.errorMessage}>{formErrors2.oldPassword}</p>}
                    </div>

                    <div>
                        <input type="password" name="newPassword" id="" placeholder='Nueva contraseña' value={formValues2.newPassword} onChange={handleChange2}/>
                        {formErrors2.newPassword && <p className={styles.errorMessage}>{formErrors2.newPassword}</p>}

                    </div>

                    <div>
                        <input type="password" name="repeatNewPassword" id="" placeholder='Repetir nueva contraseña' value={formValues2.repeatNewPassword} onChange={handleChange2}/>
                        {formErrors2.repeatNewPassword && <p className={styles.errorMessage}>{formErrors2.repeatNewPassword}</p>}
                        
                    </div>

                    <button type="submit" className={styles.buttonConfirm}>
                        Guardar Cambios
                    </button>
                    <button className={styles.buttonCancel} onClick={closeModalEditLogin}>
                        Cancelar
                    </button>
                </form>
                
            </div>
        )


    } else if(modalEditLogin.option == 1) {

        
        return (
            <div className={styles.containerPrincipalData}>
                <h2>Editar datos fiscales</h2>
                <input onChange={handleChange1} type="text" name="name" id="" value={formValues1.name} required placeholder='Nombre'/>
                <input onChange={handleChange1} type="text" name="lastName" id="" value={formValues1.lastName} required placeholder='Apellido'/>


                <h3>Fecha de nacimiento</h3>
                <div className={styles.containerBirthDate}>
                    <input type="date" name='birthdate' onChange={handleChange1} value={formValues1.birthdate || ""} placeholder='dd/mm/yy'/>
                    {/* <input type="text" name="" id=""  placeholder='mm'/>
                    <input type="text" placeholder='yyy'/> */}
                </div>
                <h3>Sexo</h3>
                <div className={styles.containerSex}>
                    <input type="radio" name="sex" value="Hombre"
                    checked={formValues1.sex === "Hombre"}
                    onChange={handleChange1}
                    />
                    <label htmlFor="">Hombre</label>
                    <input type="radio" name="sex" id="" value="Mujer"
                    checked={formValues1.sex === "Mujer"}
                    onChange={handleChange1}
                    />
                    <label htmlFor="" >Mujer</label>
                    <input type="radio" name="sex" id="" value="Otro"
                    checked={formValues1.sex === "Otro"}
                    onChange={handleChange1}
                    />
                    <label htmlFor="">Otro</label>
                </div>
                <button className={styles.buttonConfirm} onClick={handleSendForm1}>
                    Guardar Cambios
                </button>
                <button className={styles.buttonCancel} onClick={closeModalEditLogin}>
                    Cancelar
                </button>

            </div>
        )
    }

}