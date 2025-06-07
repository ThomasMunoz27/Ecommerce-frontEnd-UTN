import React, { useEffect, useState } from "react"
import { useStoreModal } from "../../../../store/useStoreModal"
import { ISize } from "../../../../types/ISize"
import styles from './AdminSize.module.css'
import { postSize, putSize } from "../../../../cruds/crudSize"
import { useStoreSize } from "../../../../store/useStoreSize"
import { errorAlert } from "../../../../utils/errorAlert"
import { succesAlert } from "../../../../utils/succesAlert"
import { formOneSlotSchema } from "../../../../yupSchemas/formSizeSchema"



export const AdminSize = () => {



    const {modalAdminSize, closeModalAdminSize} = useStoreModal()
    const {sizes, fetchSize, activeSize} = useStoreSize()
    const [newSize, setNewSize] = useState<string>()
    const [editSize, setEditSize] = useState<ISize>(activeSize!)
    const [formErrors, setFormErrors] = useState<Record<string, string>>({})

    useEffect(()=> {
        fetchSize()
    },[])

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setNewSize(e.target.value)
    }

    const handleAddSize = async(e: React.FormEvent) => {
        e.preventDefault()
        

        try {
            const size : ISize = {
                size : newSize!
            }
            await formOneSlotSchema.validate(size, {abortEarly: false})
            
            const existingSize = sizes?.some(size => size.size === newSize)
            if (existingSize){
                errorAlert('Error','El talle ya existe')
                return
            }
            

            await postSize(size)
            succesAlert('Creado','Se creo un nuevo talle exitosamente')
            fetchSize()
            closeModalAdminSize()
        } catch (error : any) {
            const errors: Record<string, string> = {}
            if(error.inner){
                error.inner.forEach((ValidationError: any) => {
                    errors[ValidationError.path] = ValidationError.message
                })
            }else{
                errors.general = error.message
            }
            setFormErrors(errors)
        }
    }

    const handleEditSize = async(e : React.FormEvent) => {
        e.preventDefault()

        if (!activeSize){
            return
        }

        try {
            await formOneSlotSchema.validate(editSize, {abortEarly: false})
            const existingSize = sizes?.some(size => size.size === editSize.size)
            if(existingSize){
                errorAlert('Error','El talle ya existe')
                return
            } 
            await putSize(editSize)
            succesAlert('Actualizado','Se actualizo el talle exitosamente')
            fetchSize()
            closeModalAdminSize()    
        } catch (error : any) {
            const errors: Record<string, string> = {}
            if(error.inner){
                error.inner.forEach((ValidationError: any) => {
                    errors[ValidationError.path] = ValidationError.message
                })
            }else{
                errors.general = error.message
            }
            setFormErrors(errors)
        }
    }


    if (modalAdminSize.option === 1){

        return (
            <div className={styles.containerPrincipal}>
                <div className={styles.containerTitle}>
                    <h1>Agregar Talle</h1>
                </div>
                <form action="" onSubmit={handleAddSize}>
                    <div className={styles.containerSizes}>
                        <input type="text" name="" id="" placeholder="Ingrese Talle" onChange={handleChange}/>
                        {formErrors.name && <p className={styles.errorMessage}>{formErrors.name}</p>}
                    </div>
                    <div className={styles.containerButtons}>
                        <button onClick={closeModalAdminSize}>Cancelar</button>
                        <button type="submit">Aceptar</button>
                    </div>
                </form>
            </div>
        )

    } else if (modalAdminSize.option === 2){
        return (
            <div className={styles.containerPrincipal}>
                <div className={styles.containerTitle}>
                    <h1>Editar Talle</h1>
                </div>
                <form action="" onSubmit={handleEditSize}>
                    <div className={styles.containerSizes}>
                        <input type="text" name="size" id="" value={editSize?.size} placeholder={`${editSize?.size}`} onChange={(e) => setEditSize({...editSize, size: e.target.value})}/>
                        {formErrors.name && <p className={styles.errorMessage}>{formErrors.name}</p>}
                        
                    </div>
                    <div className={styles.containerButtons}>
                        <button onClick={closeModalAdminSize}>Cancelar</button>
                        <button type="submit">Aceptar</button>
                    </div>
                </form>
            </div>
        )
    }
}