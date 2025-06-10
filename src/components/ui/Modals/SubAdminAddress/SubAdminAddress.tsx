import { FC, useEffect, useState } from 'react'
import {  IAdressRequest } from '../../../../types/IAdress'
import styles from './SubAdminAddress.module.css'
import { getAllLocalities } from '../../../../cruds/crudLocality'
import { ILocality } from '../../../../types/ILocality'
import { useStoreModal } from '../../../../store/useStoreModal'
import { formAdressSchema } from '../../../../yupSchemas/formAdressSchema'


interface ISubAdminAddress {
    address : IAdressRequest,
    setAddress : React.Dispatch<React.SetStateAction<IAdressRequest>>;
}

export const SubAdminAddress : FC<ISubAdminAddress> = ({address, setAddress}) => {

    const {closeSubAdminAddress} = useStoreModal()
    const [localities, setLocalities] = useState<ILocality[]>()
    const [formErrors, setFormErrors] =useState<Record<string, string>>({})

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

    const handleSubmit = async(e : React.FormEvent) => {
        e.preventDefault()
        try {
            await formAdressSchema.validate(address, {abortEarly : false})
            closeSubAdminAddress()
            
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

            <form action="" onSubmit={handleSubmit}>
                <div className={styles.containerValues}>
                    <h3>{'Editar Direccion'}</h3>

                    <label htmlFor="">Codigo Postal</label>
                    <div>
                        <input type="number" name="cp" value={address.cp} id="" onChange={handleChange}/>
                        {formErrors.cp && <p className={styles.errorMessage}>{formErrors.cp}</p>}

                    </div>

                    <label htmlFor="">Numero</label>
                    <div>
                        <input type="number" name="number" value={address.number} id="" onChange={handleChange}/>
                        {formErrors.number && <p className={styles.errorMessage}>{formErrors.number}</p>}

                    </div>

                    <label htmlFor="">Calle</label>
                    <div>
                        <input type="text" name="street" value={address.street} id="" onChange={handleChange}/>
                        {formErrors.street && <p className={styles.errorMessage}>{formErrors.street}</p>}

                    </div>

                    <label htmlFor="">Localidad</label>
                    <select name="locality" value={address.locality.id ? address.locality.id : 'Sin seleccion'} id="" onChange={handleChange}>
                        <option value="" >Sin seleccion</option>
                        {localities?.map(locality => (
                            <option key={locality.id} value={locality.id}>{locality.name}</option>
                        ))}
                    </select>

                </div>
                <div className={styles.containerButtons}>
                    <button onClick={closeSubAdminAddress}>Cancelar</button>
                    <button type='submit'>Aceptar</button>
                </div>
            </form>
        </div>
    )
}