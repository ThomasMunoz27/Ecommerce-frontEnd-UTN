import { useEffect, useState } from 'react'
import { useStoreModal } from '../../../../store/useStoreModal'
import { useStoreProvince } from '../../../../store/useStoreProvince'
import styles from './AdminProvince.module.css'
import {IProvinceRequest } from '../../../../types/IProvince'
import { postProvince, putProvince } from '../../../../cruds/crudProvince'
import { succesAlert } from '../../../../utils/succesAlert'
import { getAllCountries } from '../../../../cruds/crudCountry'
import { ICountry } from '../../../../types/ICountry'
import { formOnlyNameSchema } from '../../../../yupSchemas/formOnlyNameShema'
import { errorAlert } from '../../../../utils/errorAlert'

export const AdminProvince = () => {
    const {activeProvince, fetchProvince, provinces} = useStoreProvince()
    const {closeModalAdminProvince} = useStoreModal()
    const [countries, setCountries] = useState<ICountry[]>()
    const [formErrors, setFormErrors] =useState<Record<string, string>>({})

    
    const [province, setProvince] = useState<IProvinceRequest>({
        id : activeProvince?.id || null,
        name : activeProvince?.name  || '',
        country : {
            id : activeProvince?.country.id || 0
        }
        
    })
    
    useEffect(() => {
        const getCountries = async() => {
            const countriesFetched = await getAllCountries()
            setCountries(countriesFetched)
        }
        getCountries()
        fetchProvince()
    },[])

    const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target

        if (name === 'country'){    
            setProvince((prev) => ({
                ...prev,
                country : {id : Number(value)}
            }))
            return
        }

        setProvince((prev) => ({
            ...prev,
            [name] : value
        }))
    }

    const handleSubmit = async(e : React.FormEvent) => {
        e.preventDefault()
        try {
            await formOnlyNameSchema.validate(province, {abortEarly:false})

            const existingProvince = provinces?.some(provinceFeched => provinceFeched.name.toLowerCase() === province.name.toLowerCase() && provinceFeched.country.id === province.country.id)
                            if(existingProvince){
                                errorAlert("Error", "Esta provincia ya existe")
                                return
                            }

            if (activeProvince) {
                console.log('province enviado:', province);
                await putProvince(province)
                fetchProvince()
                succesAlert('Actualizado', 'Se actualizo la provincia exitosamente')
                closeModalAdminProvince()
            } else {
                console.log('province enviado:', province);
                await postProvince(province)
                fetchProvince()
                succesAlert('Creado', 'Se creo la provincia exitosamente')
                closeModalAdminProvince()
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
                <h1>Manejo de Provincias</h1>
            </div>
            <form action="" onSubmit={handleSubmit}>
                <div className={styles.containerValues}>

                    <h3>{activeProvince ? 'Editar Provincia' : 'Crear Provincia'}</h3>

                    <label htmlFor="">Nombre</label>

                    <div>
                    <input type="text" name="name" value={province.name} id="" onChange={handleChange}/>
                    {formErrors.name && <p className={styles.errorMessage}>{formErrors.name}</p>}
                    </div>

                    <label htmlFor="">Pais</label>
                    <select name="country" value={province.country.id || ''} id="" onChange={handleChange}>
                        <option value="" disabled >Sin seleccion</option>
                        {countries?.map(country => (
                            <option key={country.id} value={country.id}>{country.name}</option>
                        ))}
                    </select>

                </div>
                <div className={styles.containerButtons}>
                    <button onClick={closeModalAdminProvince}>Cancelar</button>
                    <button>Aceptar</button>
                </div>
            </form>
        </div>
    )
}