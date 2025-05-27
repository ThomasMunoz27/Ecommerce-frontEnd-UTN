import { FC, useEffect, useState } from 'react'
import { useStoreModal } from '../../../../store/useStoreModal'
import styles from './AdminColor.module.css'
import { IColor } from '../../../../types/IColor'
import { getAllColors, postColor, putColor } from '../../../../cruds/crudColor'
import { useStoreColor } from '../../../../store/useStoreColor'

interface IModalColor {
    color? : IColor 
}

export const AdminColor : FC<IModalColor> = ({color}) => {
    const {closeModalAdminColor, modalAdminColor} = useStoreModal()
    const {colors, fetchColors} = useStoreColor()
    
    const [addColor, setAddColor] = useState<string>('#000000')
    const [editColor, setEditColor] = useState<IColor>(color!)

    useEffect(() => {
        fetchColors()
    },[colors])

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setAddColor(e.target.value)
    }

    // Funcion para agregar un color
    const handleAddColor = async(e : React.FormEvent) => {
        e.preventDefault()

        try {
            const existingColor = colors?.some(color => color.value === addColor)
            if (existingColor){
                alert('El color ya existe')
                return
            }
            // Hago un objeto tipo color
            const newColor : IColor = {
                value : addColor
            }

            await postColor(newColor)
            alert('Color agregado')
            fetchColors() // Actualizo el estado
            closeModalAdminColor()
            
        } catch (error : any) {
            alert('Ocurrio un error')
            console.log(error.message);
        }
    }

    // Funcion para editar un color
    const handleEditColor = async(e : React.FormEvent) => {
        e.preventDefault()

        if (!editColor || !editColor.id) {
            alert('Color no valido')
            return
        }

        try {
            const exist = colors?.some(color => color.value === editColor.value && color.id === editColor.id)
            if(exist){
                alert('El color ya existe')
                return
            }
            await putColor(editColor)
            alert('Color actualizado')
            fetchColors() // Actualizo el estado
            closeModalAdminColor()
        } catch (error : any) {
            alert('Ocurrio un error')
            console.log(error.message);
            
        }
    }

    if (modalAdminColor.option === 1) {

        return(
            <div className={styles.containerPrincipal}>
                <div className={styles.containerTitle}>
                    <h1>Agregar un Color</h1>
                </div>
                <form action="" onSubmit={handleAddColor}>
                    <div className={styles.containerInput}>
                        <input name='value' type="color" value={addColor} onChange={handleChange}/>
                        <p>Valor del color: {addColor}</p>
                    </div>
                    <div className={styles.containerButtons}>
                        <button onClick={closeModalAdminColor}>Cancelar</button>
                        <button type='submit'>Aceptar</button>
                    </div>
                </form>
            </div>
        )
    }else if (modalAdminColor.option === 2) {
        return(

            <div className={styles.containerPrincipal}>
                <div className={styles.containerTitle}>
                    <h1>Editar Color : {color?.value}</h1>
                </div>
                <form action="" onSubmit={handleEditColor}>
                    <div className={styles.containerInput}>
                        <input type="color" value={editColor.value} onChange={(e) => setEditColor({...editColor, value : e.target.value})}/>
                        <p>Valor del color: {color?.value}</p>
                    </div>
                    <div className={styles.containerButtons}>
                        <button onClick={closeModalAdminColor}>Cancelar</button>
                        <button type='submit'>Aceptar</button>
                    </div>
                </form>
            </div>
        )
    }

}