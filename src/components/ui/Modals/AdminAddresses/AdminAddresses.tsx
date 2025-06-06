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

export const AdminAddresses = () => {

    const {closeModalAdminAdress} = useStoreModal()
    const {fetchAdress, activeAdress} = useStoreAdress()
    const [localities, setLocalities] = useState<ILocality[]>()
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
        try {
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
            console.log(error.message);
            activeAdress ? errorAlert('Error', 'No se pudo actualizar la direccion') : errorAlert('Error', 'No se pudo crear la direccion')
            closeModalAdminAdress()
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
                    <input type="number" name="cp" value={address.cp} id="" onChange={handleChange}/>

                    <label htmlFor="">Numero</label>
                    <input type="number" name="number" value={address.number} id="" onChange={handleChange}/>

                    <label htmlFor="">Calle</label>
                    <input type="text" name="street" value={address.street} id="" onChange={handleChange}/>

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