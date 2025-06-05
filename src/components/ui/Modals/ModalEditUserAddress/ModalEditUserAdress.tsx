import { useEffect, useState } from 'react'
import styles from './ModalEditUserAdress.module.css'
import { getAllLocalities } from '../../../../cruds/crudLocality'
import { ILocality } from '../../../../types/ILocality'
import { useStoreModal } from '../../../../store/useStoreModal'
import { useStoreUsers } from '../../../../store/useStoreUsers'

export const ModalEditUserAdress = () => {

    const {closeModalEditAddress} = useStoreModal()
    const [localities, setLocalities] = useState<ILocality[]>()
    const {user} = useStoreUsers()
    

    useEffect(() => {
        const getLocalities = async() => {
            const localitiesFetched = await getAllLocalities()
            setLocalities(localitiesFetched)
        }
        getLocalities()
    },[])

    return (
        <div className={styles.containerPrincipal}>
            <div className={styles.containerTitle}>
                <h1>Editar Direccion</h1>
            </div>
            <form action="">
                <div className={styles.containerData}>
                    
                    <label htmlFor="">Calle</label>
                    <input type="text" name="" id="" value={user?.adress.street}/>
                    <label htmlFor="">Numero</label>
                    <input type="number" name="" id="" value={user?.adress.number}/>
                    <label htmlFor="">Codigo Postal</label>
                    <input type="number" name="" id="" value={user?.adress.cp}/>

                    <label htmlFor="">Localidad</label>
                    <select name="" id="">
                        <option value="" disabled selected>Sin seleccion</option>
                        {localities?.map(locality => (
                            <option key={locality.id} value="" >{locality.name}</option>
                        ))}
                    </select>
                    
                </div>
                
                <div className={styles.containerButtons}>
                    <button onClick={closeModalEditAddress}>Cancelar</button>
                    <button>Aceptar</button>
                </div>
            </form>
        </div>
    )
}