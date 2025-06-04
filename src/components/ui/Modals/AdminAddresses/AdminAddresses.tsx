import { useEffect, useState } from 'react'
import { useStoreAdress } from '../../../../store/useStoreAdresses'
import { useStoreModal } from '../../../../store/useStoreModal'
import styles from './AdminAddresses.module.css'
import { getAllLocalities } from '../../../../cruds/crudLocality'
import { ILocality } from '../../../../types/ILocality'
import { IAdressRequest } from '../../../../types/IAdress'
import { errorAlert } from '../../../../utils/errorAlert'
import { postAdress, putAdress } from '../../../../cruds/crudAddress'
import { succesAlert } from '../../../../utils/succesAlert'
import { formAdressSchema } from '../../../../yupSchemas/formAdressSchema'

export const AdminAddresses = () => {

    const {closeModalAdminAdress} = useStoreModal()
    const {fetchAdress, activeAdress} = useStoreAdress()
    const [localities, setLocalities] = useState<ILocality[]>()
    const [formErrors, setFormErrors] =useState<Record<string, string>>({})

    const [address, setAddress] = useState<IAdressRequest>({
        id: activeAdress?.id || null,
        street: activeAdress?.street || '',
        number: activeAdress?.number || 0,
        cp: activeAdress?.cp || 0,
        locality: {id : 0}
    })

    useEffect(() => {
        const getLocalities = async() => {
            const localitiesFetched = await getAllLocalities()
            setLocalities(localitiesFetched)
        }
        getLocalities()
    },[])


    const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target

        if(name === 'locality') {
            setAddress((prev) => ({
                ...prev,
                locality : {id : Number(value)}
            }))
            return
        }

        setAddress((prev) => ({
            ...prev,
            [name] : value
        }) )
    }

    const hanldeSubmit = async(e : React.FormEvent) => {
        e.preventDefault()
        console.log(address)
        try {
            await formAdressSchema.validate(address, {abortEarly: false})
            if(!address.id){
                errorAlert("Seleccione una localidad")
                return
            }
            if (activeAdress){
                await putAdress(address)
                fetchAdress()
                succesAlert('Actualizado', 'Se actualizo la direccion exitosamente')
                closeModalAdminAdress()
            } else {
                await postAdress(address)
                fetchAdress()
                succesAlert('Creado', 'Se creo la direccion exitosamente')
                closeModalAdminAdress()
            }
        } catch (error : any) {
            const errors: Record<string, string> = {}
                if(error.inner){
                    error.inner.forEach((validationError:any) =>{
                        errors[validationError.path] = validationError.message;
                    });
                }else{
                    error.general = error.message
                }
                setFormErrors(errors)
        }
    }

    return (
        <div className={styles.containerPrincipal}>
            <div className={styles.containerTitle}>
                <h1>Manejo de Direcciones</h1>
            </div>

            <form action="" onSubmit={hanldeSubmit}>
                <div className={styles.containerValues}>
                    <h3>{activeAdress ? 'Editar Direccion' : 'Crear Direccion'}</h3>

                    <label htmlFor="">Codigo Postal</label>
                    <div>
                        <input type="number" name="cp" value={address.cp} id="" onChange={handleChange}/>
                        {formErrors.number && <p className={styles.errorMessage}>{formErrors.number}</p>}

                    </div>

                    <label htmlFor="">Numero</label>
                    <div>
                        <input type="number" name="number" value={address.number} id="" onChange={handleChange}/>
                        {formErrors.cp && <p className={styles.errorMessage}>{formErrors.cp}</p>}

                    </div>

                    <label htmlFor="">Calle</label>

                    <div>
                        <input type="text" name="street" value={address.street} id="" onChange={handleChange}/>
                        {formErrors.street && <p className={styles.errorMessage}>{formErrors.street}</p>}

                    </div>

                    <label htmlFor="">Localidad</label>
                    <select name="locality" value={address.locality.id} id="" onChange={handleChange}>
                        <option value="" disabled>Sin seleccion</option>
                        {localities?.map(locality => (
                            <option key={locality.id} value={locality.id}>{locality.name}</option>
                        ))}
                    </select>

                </div>
                <div className={styles.containerButtons}>
                    <button onClick={closeModalAdminAdress}>Cancelar</button>
                    <button>Aceptar</button>
                </div>
            </form>
        </div>
    )
}