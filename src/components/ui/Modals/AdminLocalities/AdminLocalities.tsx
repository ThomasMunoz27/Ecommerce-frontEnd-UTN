import { useEffect, useState } from 'react'
import { useStoreLocality } from '../../../../store/useStoreLocalities'
import { useStoreModal } from '../../../../store/useStoreModal'
import styles from './AdminLocalities.module.css'
import { getAllProvinces } from '../../../../cruds/crudProvince'
import { IProvince } from '../../../../types/IProvince'
import { ILocalityRequest } from '../../../../types/ILocality'
import { errorAlert } from '../../../../utils/errorAlert'
import { postLocality, putLocality } from '../../../../cruds/crudLocality'
import { succesAlert } from '../../../../utils/succesAlert'

export const AdminLocalities = () => {

    const {closeModalAdminLocality} = useStoreModal()
    const {fetchLocality, activeLocality} = useStoreLocality()
    const [provinces, setProvinces] = useState<IProvince[]>()

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
            console.log(error.message);
            activeLocality ? errorAlert('Error', 'No se pudo actualizar la localidad') : errorAlert('Error', 'No se pudo crear la localidad')    
            closeModalAdminLocality()
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
                    <input type="text" name="name" value={locality.name} id="" onChange={handleChange} />

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
