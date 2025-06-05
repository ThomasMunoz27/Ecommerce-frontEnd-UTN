import React, { useEffect, useState } from 'react'
import { useStoreDiscount } from '../../../../store/useStoreDiscount'
import { useStoreModal } from '../../../../store/useStoreModal'
import styles from './AdminDsicounts.module.css'
import { IDiscount } from '../../../../types/IDiscount'
import { getAllDiscounts, postDiscount, putDiscount } from '../../../../cruds/crudDiscount'
import { succesAlert } from '../../../../utils/succesAlert'
import { errorAlert } from '../../../../utils/errorAlert'
import { formDiscountSchema } from '../../../../yupSchemas/formDiscountSchema'



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

    const [formErrors, setFormErrors] = useState<Record<string, string>>({})

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
        try {
            await formDiscountSchema.validate(activeDiscount, {abortEarly: false})

            const updatedDiscount = await putDiscount(activeDiscount!)
            console.log(updatedDiscount);    
            succesAlert('Actualizado', 'Se actualizo el descuento exitosamente')
            fetchDiscount()
            closeModalAdminDiscount()
        } catch (error : any) {
            const errors: Record<string, string> = {}
            if(error.inner){
                error.inner.forEach((validationError: any) => {
                    errors[validationError.path] = validationError.message
                })
            }else{
                errors.general = error.message
            }
            setFormErrors(errors)
        }
    }

    const handleAddDiscount = async(e : React.FormEvent) => {
        
        e.preventDefault()

        
        try {
            await formDiscountSchema.validate(newDiscount, {abortEarly: false})
            
            const existDiscount = discounts?.some(discount => discount.name === newDiscount.name)
            if (existDiscount){
                alert('El dexcuento ya existe')
                return 
            }
            
            const addDiscount = await postDiscount(newDiscount)
            console.log(addDiscount);
            succesAlert('Creado', 'Se agrego un nuevo descuento')
            
            fetchDiscount() // Actualizo el estado
            closeModalAdminDiscount()
            
        } catch (error : any) {
            const errors:Record<string, string> = {} 
            if(error.inner){
                error.inner.forEach((ValidationError:any)=> {
                    errors[ValidationError.path] = ValidationError.message
                })
            }else{
                errors.general = error.message
            }
            setFormErrors(errors)
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
                            <div>
                                <input type="text" name="name" id=""  onChange={handleChange}/>
                                {formErrors.name && <p className={styles.errorMessage}>{formErrors.name}</p>}
                            </div>
                            
                            <label htmlFor="">Fecha Desde</label>
                            <div>
                                <input type="date" name="dateTo" id=""  onChange={handleChange}/>
                                {formErrors.dateTo && <p className={styles.errorMessage}>{formErrors.dateTo}</p>}
                            </div>

                            <label htmlFor="">Fecha Hasta</label>
                            <div>
                                <input type="date" name="dateFrom" id="" onChange={handleChange}/>
                                {formErrors.dateFrom && <p className={styles.errorMessage}>{formErrors.dateFrom}</p>}
                            </div>

                        </div>
                        <div className={styles.containerRigth}>

                            <label htmlFor="">Hora Desde</label>
                            <div>
                                <input type="text" name="timeTo" id="" onChange={handleChange}/>
                                {formErrors.timeTo && <p className={styles.errorMessage}>{formErrors.timeTo}</p>}
                            </div>
                            <label htmlFor="">Hora Hasta</label>

                            <div>
                                <input type="text" name="timeFrom" id="" onChange={handleChange}/>
                                {formErrors.timeFrom && <p className={styles.errorMessage}>{formErrors.timeFrom}</p>}
                            </div>
                            <label htmlFor="">Precio Promocional</label>
                            <div>
                                <input type="number" name="promotionalPrice" id="" onChange={handleChange}/>
                                {formErrors.promotionalPrice && <p className={styles.errorMessage}>{formErrors.promotionalPrice}</p>}
                            </div>

                        </div>
                        
                    </div>
                    <div className={styles.textarea}>

                        <label htmlFor="">Descripcion</label>
                        <div>
                            <textarea name="discountDescription" id="" onChange={handleChange}></textarea>
                            {formErrors.discountDescription && <p className={styles.errorMessage}>{formErrors.discountDescription}</p>}
                        </div>

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
                            <div>
                                <input type="text"  name="name" value={activeDiscount?.name} id="" onChange={handleEditChange}/>
                                {formErrors.name && <p className={styles.errorMessage}>{formErrors.name}</p>}
                            </div>

                            <label htmlFor="">Fecha Desde</label>
                            <div>
                                <input type="date" name="dateTo" value={activeDiscount?.dateFrom} id="" onChange={handleEditChange}/>
                                {formErrors.dateTo && <p className={styles.errorMessage}>{formErrors.dateTo}</p>}
                            </div>

                            <label htmlFor="">Fecha Hasta</label>
                            <div>
                                <input type="date" name="dateFrom" value={activeDiscount?.dateFrom} id="" onChange={handleEditChange}/>
                                {formErrors.dateFrom && <p className={styles.errorMessage}>{formErrors.dateFrom}</p>}
                            </div>

                        </div>
                        <div className={styles.containerRigth}>

                            <label htmlFor="">Hora Desde</label>
                            <div>
                                <input type="text" name="timeTo" value={activeDiscount?.timeTo} id="" onChange={handleEditChange}/>
                                {formErrors.timeTo && <p className={styles.errorMessage}>{formErrors.timeTo}</p>}
                            </div>

                            <label htmlFor="">Hora Hasta</label>
                            <div>
                                <input type="text" name="timeFrom" value={activeDiscount?.timeFrom} id="" onChange={handleEditChange}/>
                                {formErrors.timeFrom && <p className={styles.errorMessage}>{formErrors.timeFrom}</p>}
                            </div>

                            <label htmlFor="">Precio Promocional</label>
                            <div>
                                <input type="number" name="promotionalPrice" value={activeDiscount?.promotionalPrice} id="" onChange={handleEditChange}/>
                                {formErrors.promotionalPrice && <p className={styles.errorMessage}>{formErrors.promotionalPrice}</p>}
                            </div>

                        </div>
                        
                    </div>
                    <div className={styles.textarea}>
                        <label htmlFor="">Descripcion</label>
                        <div>
                            <textarea name="discountDescription" id="" value={activeDiscount?.discountDescription} onChange={handleEditChange}></textarea>
                            {formErrors.discountDescription && <p className={styles.errorMessage}>{formErrors.discountDescription}</p>}
                        </div>
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