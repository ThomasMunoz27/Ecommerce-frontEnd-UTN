import { useEffect, useState } from 'react'
import { useStoreLocality } from '../../../../store/useStoreLocalities'
import { useStoreModal } from '../../../../store/useStoreModal'
import styles from './AdminLocalities.module.css'
import { getAllProvinces } from '../../../../cruds/crudProvince'
import { IProvince } from '../../../../types/IProvince'
import { ILocalityRequest } from '../../../../types/ILocality'
import { postLocality, putLocality } from '../../../../cruds/crudLocality'
import { succesAlert } from '../../../../utils/succesAlert'
import { formOnlyNameSchema } from '../../../../yupSchemas/formOnlyNameShema'
import { errorAlert } from '../../../../utils/errorAlert'

export const AdminLocalities = () => {

    const {closeModalAdminLocality} = useStoreModal()
    const {fetchLocality, activeLocality, localities} = useStoreLocality()
    const [provinces, setProvinces] = useState<IProvince[]>()
    const [formErrors, setFormErrors] =useState<Record<string, string>>({})


    const [locality, setLocality] = useState<ILocalityRequest>({
        id : activeLocality?.id || null,
        name : activeLocality?.name || '',
        province : {id : activeLocality?.province.id || 0}
    })

    useEffect(() => {
        const getProvinces = async() => {
            const fetchedProvinces = await getAllProvinces()
            setProvinces(fetchedProvinces)
        }
        getProvinces()
        fetchLocality()
    },[])

    const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target

        if (name === 'province') {
            setLocality((prev) => ({
                ...prev,
                province : {id : Number(value)}
            }))
            return
        }

        setLocality((prev) => ({
            ...prev,
            [name] : value
        }))
    }

    const handleSubmit = async(e : React.FormEvent) => {
        e.preventDefault()
        try {
            await formOnlyNameSchema.validate(locality, {abortEarly:false})

            const existingLocality = localities?.some(localityFeched => localityFeched.name.toLowerCase().trim() === locality.name.toLowerCase().trim() && localityFeched.province.id === locality.province.id)
                            if(existingLocality){
                                errorAlert("Error", "Esta localidad ya existe")
                                return
                            }

            if (activeLocality){
                await putLocality(locality)
                fetchLocality()
                succesAlert('Editado', 'Se edito la localidad')
                closeModalAdminLocality()
            }else{
                await postLocality(locality)
                fetchLocality()
                succesAlert('Creado', 'Se creo la localidad')
                closeModalAdminLocality()
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
                <h1>Manejo de Localidades</h1>
            </div>
            <form action="" onSubmit={handleSubmit}>
                <div className={styles.containerValues}>
                    <h3>{activeLocality ? 'Editar localidad' : 'Crear Localidad'}</h3>

                    <label htmlFor="">Nombre</label>

                    <div>
                        <input type="text" name="name" value={locality.name} id="" onChange={handleChange} />
                        {formErrors.name && <p className={styles.errorMessage}>{formErrors.name}</p>}
                    </div>

                    <label htmlFor="">Provincia</label>
                    <select name="province" value={locality.province.id || ''} id="" onChange={handleChange}>
                        <option value="" disabled>Sin seleccion</option>
                        {provinces?.map(province => (
                            <option key={province.id} value={province.id} >{province.name}</option>
                        ))}
                    </select>

                </div>
                <div className={styles.containerButtons}>
                    <button onClick={closeModalAdminLocality}>Cancelar</button>
                    <button>Aceptar</button>
                </div>
            </form>
        </div>
    )
}
