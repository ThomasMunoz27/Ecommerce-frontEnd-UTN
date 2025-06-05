import React, { useEffect, useState } from 'react'
import styles from './ModalEditUserAdress.module.css'
import { getAllLocalities } from '../../../../cruds/crudLocality'
import { ILocality } from '../../../../types/ILocality'
import { useStoreModal } from '../../../../store/useStoreModal'
import { useStoreUsers } from '../../../../store/useStoreUsers'

import { IAdress } from '../../../../types/IAdress'
import { putAdress } from '../../../../cruds/crudAddress'
import { succesAlert } from '../../../../utils/succesAlert'

export const ModalEditUserAdress = () => {

    const {closeModalEditAddress} = useStoreModal()
    const [localities, setLocalities] = useState<ILocality[]>()
    const {user, setUser} = useStoreUsers()
    const [newAddress, setNewAddress] = useState<IAdress>({
        id: user?.adress.id,
        street: user?.adress.street!,
        number: user?.adress.number!,
        cp: user?.adress.cp!,
        locality: user?.adress.locality!
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

        if(name === 'locality.name'){
            const selectedLocality = localities?.find(locality => locality.id === Number(value))
            if(selectedLocality) {

                setNewAddress((prev)=> ({
                    ...prev,
                    locality : selectedLocality
                }))
            }
        }

        setNewAddress((prev) => ({
            ...prev,
            [name] : value
        }))
        
    } 

    const handleSubmit = async(e : React.FormEvent) => {
        e.preventDefault()

        try {
            await putAdress(newAddress)
            succesAlert('Editado', 'La direccion se edito con exito')
        } catch (error: any) {
            console.log(error.message);

            
        }
    }

    return (
        <div className={styles.containerPrincipal}>
            <div className={styles.containerTitle}>
                <h1>Editar Direccion</h1>
            </div>
            <form action="" onSubmit={handleSubmit}>
                <div className={styles.containerData}>

                    <label htmlFor="">Calle</label>
                    <input type="text" name="street" id="" value={newAddress.street} onChange={handleChange}/>
                    <label htmlFor="">Numero</label>
                    <input type="number" name="number" id="" value={newAddress.number} onChange={handleChange}/>
                    <label htmlFor="">Codigo Postal</label>
                    <input type="number" name="cp" id="" value={newAddress.cp} onChange={handleChange}/>

                    <label htmlFor="">Localidad</label>
                    <select name="locality" value={newAddress.locality.name} id="">
                        <option value="" disabled selected>Sin seleccion</option>
                        {localities?.map(locality => (
                            <option key={locality.id} value={locality.id} >{locality.name}</option>
                        ))}
                    </select>
                    
                </div>
                
                <div className={styles.containerButtons}>
                    <button onClick={closeModalEditAddress}>Cancelar</button>
                    <button type='submit'>Aceptar</button>
                </div>
            </form>
        </div>
    )
}