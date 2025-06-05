import { useState } from 'react'
import { useStoreCountry } from '../../../../store/useStoreCountry'
import { useStoreModal } from '../../../../store/useStoreModal'
import styles from './AdminCountry.module.css'
import { ICountry } from '../../../../types/ICountry'
import { postCountry, putCountry} from '../../../../cruds/crudCountry'
import { succesAlert } from '../../../../utils/succesAlert'
import { errorAlert } from '../../../../utils/errorAlert'

export const AdminCountry = () => {

    const {activeCountry, fetchCountry} = useStoreCountry()
    const {closeModalAdminCountry} = useStoreModal()
    const [country, setCountry] = useState<ICountry>({
        id : activeCountry?.id || 0,
        name : activeCountry?.name || ''
    })

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        
        setCountry((prev) => ({
            ...prev,
            [name] : value
        }))
    }

    const handleSubmit = async(e : React.FormEvent) => {
        e.preventDefault()
        if (activeCountry){

            try {
                await putCountry(country)
                succesAlert('Editado', 'El pais se edito correctamente')
                fetchCountry()
                closeModalAdminCountry()
            } catch (error : any) {
                console.log(error.message);
                errorAlert('Error', 'No se pudo editar el pais')
            }

        }else {
            
            try {
                await postCountry({name : country.name})
                succesAlert('Creado', 'El pais se creo correctamente')
                fetchCountry()
                closeModalAdminCountry()
            } catch (error : any) {
                console.log(error.message);
                errorAlert('Error', 'No se pudo crear el pais')
            }
        }

    }

    return(
        <div className={styles.containerPrincipal}>
            <div className={styles.containerTitle}>
                <h1>Manejo de Pais</h1>
            </div>
            <form action="" onSubmit={handleSubmit}>
                <div className={styles.containerValue}>
                    <h3>{activeCountry ? 'Editar Pais' : 'Crear Pais'}</h3>
                    <label htmlFor="">Nombre</label>
                    <input type="text" name="name" id="" value={country.name} onChange={handleChange}/>
                </div>
                <div className={styles.containerButtons}>
                    <button onClick={closeModalAdminCountry}>Cancelar</button>
                    <button type='submit'>Aceptar</button>
                </div>
            </form>
        </div>
    )
}