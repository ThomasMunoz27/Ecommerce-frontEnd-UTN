import React, { useEffect, useState } from 'react'
import { useStoreDiscount } from '../../../../store/useStoreDiscount'
import { useStoreModal } from '../../../../store/useStoreModal'
import styles from './AdminDsicounts.module.css'
import { IDiscount } from '../../../../types/IDiscount'
import { getAllDiscounts, postDiscount, putDiscount } from '../../../../cruds/crudDiscount'



export const AdminDsicounts = () => {
    const [discounts, setDiscounts] = useState<IDiscount[]>()
    const {closeModalAdminDiscount, modalAdminDiscount} = useStoreModal()
    const {activeDiscount, setActiveDiscount , fetchDiscount} = useStoreDiscount()
    const [newDiscount, setNewDiscount] = useState<IDiscount>({
        name : '',
        discountDescription : '',
        dateTo : '',
        dateFrom : '',
        timeTo: '',
        timeFrom : '',
        promotionalPrice : 0
    })

    useEffect(() => {
        const getDiscounts = async() => {
            const discountsFetched = await getAllDiscounts()
            setDiscounts(discountsFetched)
        }
        getDiscounts()
    },[])


    const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target

        setNewDiscount((prev) => ({
            ...prev!,
            [name] : name === 'price' ? Number(value) : value
        }))
    }

    const handleEditChange = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target

        if (!activeDiscount) return
        setActiveDiscount({
            ...activeDiscount,
            [name] : name === 'promotionalPrice' ? Number(value) : value
        })
    }

    const handleEdit = async(e : React.FormEvent) => {
        e.preventDefault()
        if (!activeDiscount) return
        try {
            const updatedDiscount = await putDiscount(activeDiscount)
            console.log(updatedDiscount);    
            alert('Se actualizo el descuento')
            fetchDiscount()
            closeModalAdminDiscount()
        } catch (error : any) {
            alert('No se puede actualizar el descuento')
            console.log(error.message);
            
        }
    }

    const handleAddDiscount = async(e : React.FormEvent) => {
        
        e.preventDefault()

        const existDiscount = discounts?.some(discount => discount.name === newDiscount.name)
        if (existDiscount){
            alert('El dexcuento ya existe')
            return 
        }

        try {
            const addDiscount = await postDiscount(newDiscount)
            
            console.log(addDiscount);
            alert('Se agrego un nuevo descuento')
            fetchDiscount() // Actualizo el estado
            closeModalAdminDiscount()
            
        } catch (error : any) {
            alert('No se pudo agregar el descuento')
            console.log(error.message);
            
        }
        
    }

    if(modalAdminDiscount.option === 1){
        return(
            <div className={styles.containerPrincipal}>
                <div className={styles.containerTitle}>
                    <h1>Agregar Descuento</h1>
                </div>
                <form action="" onSubmit={handleAddDiscount}>
                    <div className={styles.containerData}>
                        <div className={styles.containerLeft}>

                            <label htmlFor="">Nombre</label>
                            <input type="text" name="name" id=""  onChange={handleChange}/>
                            <label htmlFor="">Fecha Desde</label>
                            <input type="date" name="dateTo" id=""  onChange={handleChange}/>
                            <label htmlFor="">Fecha Hasta</label>
                            <input type="date" name="dateFrom" id="" onChange={handleChange}/>

                        </div>
                        <div className={styles.containerRigth}>

                            <label htmlFor="">Hora Desde</label>
                            <input type="text" name="timeTo" id="" onChange={handleChange}/>
                            <label htmlFor="">Hora Hasta</label>
                            <input type="text" name="timeFrom" id="" onChange={handleChange}/>
                            <label htmlFor="">Precio Promocional</label>
                            <input type="number" name="promotionalPrice" id="" onChange={handleChange}/>

                        </div>
                        
                    </div>
                    <div className={styles.textarea}>

                        <label htmlFor="">Descripcion</label>
                        <textarea name="discountDescription" id="" onChange={handleChange}></textarea>

                    </div>
                    <div className={styles.containerButtons}>
                        <button onClick={closeModalAdminDiscount}>Cancelar</button>
                        <button type='submit'>Aceptar</button>
                    </div>
                </form>
            </div>
        )
    }else if (modalAdminDiscount.option === 2) {
        return (
            <div className={styles.containerPrincipal}>
                <div className={styles.containerTitle}>
                    <h1>Editar Descuento</h1>
                </div>
                <form action="" onSubmit={handleEdit}>
                    <div className={styles.containerData}>
                        <div className={styles.containerLeft}>
                            
                            <label htmlFor="">Nombre</label>
                            <input type="text"  name="name" value={activeDiscount?.name} id="" onChange={handleEditChange}/>
                            <label htmlFor="">Fecha Desde</label>
                            <input type="date" name="dateTo" value={activeDiscount?.dateFrom} id="" onChange={handleEditChange}/>
                            <label htmlFor="">Fecha Hasta</label>
                            <input type="date" name="dateFrom" value={activeDiscount?.dateFrom} id="" onChange={handleEditChange}/>

                        </div>
                        <div className={styles.containerRigth}>

                            <label htmlFor="">Hora Desde</label>
                            <input type="text" name="timeTo" value={activeDiscount?.timeTo} id="" onChange={handleEditChange}/>
                            <label htmlFor="">Hora Hasta</label>
                            <input type="text" name="timeFrom" value={activeDiscount?.timeFrom} id="" onChange={handleEditChange}/>
                            <label htmlFor="">Precio Promocional</label>
                            <input type="number" name="promotionalPrice" value={activeDiscount?.promotionalPrice} id="" onChange={handleEditChange}/>

                        </div>
                        
                    </div>
                    <div className={styles.textarea}>
                        <label htmlFor="">Descripcion</label>
                        <textarea name="discountDescription" id="" value={activeDiscount?.discountDescription} onChange={handleEditChange}></textarea>
                    </div>
                    <div className={styles.containerButtons}>
                        <button onClick={closeModalAdminDiscount}>Cancelar</button>
                        <button type='submit'>Aceptar</button>
                    </div>
                </form>
            </div>
        )
    }
}