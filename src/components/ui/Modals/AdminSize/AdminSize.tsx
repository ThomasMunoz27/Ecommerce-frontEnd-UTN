import React, { FC, useEffect, useState } from "react"
import { useStoreModal } from "../../../../store/useStoreModal"
import { ISize } from "../../../../types/ISize"
import styles from './AdminSize.module.css'
import { getAllSizes, postSize, putSize } from "../../../../cruds/crudSize"

interface IAdminSize {
    size? : ISize
}

export const AdminSize: FC<IAdminSize> = ({size}) => {



    const {modalAdminSize, closeModalAdminSize} = useStoreModal()
    const [newSize, setNewSize] = useState<string>()
    const [sizes, setSizes] = useState<ISize[]>()
    const [editSize, setEditSize] = useState<ISize>(size!)

    useEffect(()=> {
        const getSizes = async () => {
            const sizesFetched = await getAllSizes()
            setSizes(sizesFetched)
        }
        getSizes()
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
            closeModalAdminSize()
        } catch (error : any) {
            alert('Ocurrio un error en agregar uun talle')
            console.log(error.message);
            
        }
    }

    const handleEditSize = async(e : React.FormEvent) => {
        e.preventDefault()

        if (!editSize || !size){
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