import React, { useEffect, useState } from "react"
import { useStoreModal } from "../../../../store/useStoreModal"
import { ISize } from "../../../../types/ISize"
import styles from './AdminSize.module.css'
import { postSize, putSize } from "../../../../cruds/crudSize"
import { useStoreSize } from "../../../../store/useStoreSize"



export const AdminSize = () => {



    const {modalAdminSize, closeModalAdminSize} = useStoreModal()
    const {sizes, fetchSize, activeSize} = useStoreSize()
    const [newSize, setNewSize] = useState<string>()
    const [editSize, setEditSize] = useState<ISize>(activeSize!)

    useEffect(()=> {
        fetchSize()
    },[])

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setNewSize(e.target.value)
    }

    const handleAddSize = async(e: React.FormEvent) => {
        e.preventDefault()
        if(!newSize){
            alert('Talle no valido')
            return
        }

        try {
            const existingSize = sizes?.some(size => size.size === newSize)
            if (existingSize){
                alert('El talle ya existe')
                return
            }

            const size : ISize = {
                size : newSize
            }

            await postSize(size)
            alert('Se creo un nuevo talle')
            fetchSize()
            closeModalAdminSize()
        } catch (error : any) {
            alert('Ocurrio un error en agregar uun talle')
            console.log(error.message);
            
        }
    }

    const handleEditSize = async(e : React.FormEvent) => {
        e.preventDefault()

        if (!activeSize){
            return
        }

        try {
            const existingSize = sizes?.some(size => size.size === editSize.size)
            if(existingSize){
                alert('El talle ya existe')
                return
            } 
            await putSize(editSize)
            alert('Se actualizo el talle')
            fetchSize()
            closeModalAdminSize()    
        } catch (error : any) {
            alert('Ocurrio un error en editar talle')
            console.log(error.message);
            
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