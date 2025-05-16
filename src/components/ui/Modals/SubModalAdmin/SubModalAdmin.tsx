import React, { useEffect, useState } from 'react'
import { useStoreModal } from '../../../../store/useStoreModal'
import useStoreProduct from '../../../../store/useStoreProduct'
import styles from './SubModalAdmin.module.css'
import { IColor } from '../../../../types/IColor'
import { ISize } from '../../../../types/ISize'
import { getAllSizes } from '../../../../cruds/crudSize'

export const SubModalAdmin = () => {

    const {closeOpenModalSubAdmin, modalSubAdmin} = useStoreModal()
    const {activeProduct} = useStoreProduct()
    const [sizes, setSizes] = useState<ISize[]>() // Estado para traer todos los talles
    const [color, setColor] = useState<string>("#000000") // Valor negro por defecto
    

    const [newSize, setNewSize] = useState<string>()
    
    // Traigo todos los talles
    useEffect(() => {
        const obtainCategories = async() => {
            const getSizes = await getAllSizes()
            setSizes(getSizes)
        }

        obtainCategories()
    },[])


    // Manejo el cambio de talle
    const handleChangeSize = (e : React.ChangeEvent<HTMLSelectElement>) => {
        setNewSize(e.target.value) // Esto es el nombre
    }

    const handleSubmitSize = () => {
        if (!activeProduct) return null

        const existingSize = activeProduct.sizes.some(size => size.size === newSize)
        if(existingSize){
            alert('Este producto ya tiene este talle')
            return
        }

        const addSize = sizes?.find(size => size.size === newSize)
        activeProduct.sizes.push(addSize!)

        closeOpenModalSubAdmin()
    }

    // Manejo el cambio de estado de los colores
    const handleChangeColor = (e : React.ChangeEvent<HTMLInputElement>) => {
        setColor(e.target.value)
    }

    

    // Subo el nuevo color 
    const handleSubmitColors = () => {
        if (!activeProduct) return null

        const existingColor = activeProduct.colors.some(c => c.value === color)
        if (existingColor) {
            alert('Color ya agregado')
            return
        }

        const maxId = Math.max(...activeProduct.colors.map(c => c.id), 0)
        const newColor: IColor = {
            id : maxId + 1,
            value: color
        }
        activeProduct.colors.push(newColor)
        closeOpenModalSubAdmin()
    }

    // Modal para manejar talles

    if (modalSubAdmin.option === 1){

        return (
            <div className={styles.containerPrincipal}>

                <div className={styles.containerGeneralSizes}>
                    <h3 className={styles.title}>Agregar Talles</h3>

                    <select name="" id="" value={newSize} onChange={handleChangeSize}>
                        {sizes?.map(size => (
                            <option value={size.size} key={size.id}>{size.size}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.containerProductSizes}>
                    <h3 className={styles.title}>Eliminar Talles: {activeProduct?.name}</h3>

                    <select name="" id="" >
                        {activeProduct?.sizes.map(size => (
                            <option key={size.id} value='' >{size.size} </option>
                        ))}
                    </select>
                </div>
    
                <div className={styles.containerButtons}>
                    <button onClick={handleSubmitSize}>Aceptar</button>
                    <button onClick={closeOpenModalSubAdmin}>Cancelar</button>
                </div>
            </div>
        )
    }else if(modalSubAdmin.option === 2){

        // Modal para manejar Colores

        return(
            <div className={styles.containerPrincipal}>
                <div className={styles.containerColor}>
                    <h3>Eliminar Color: {activeProduct?.name}</h3>
                    <select name="" id="">
                        <option value="" >Sin seleccion</option>
                        {activeProduct?.colors.map(color => (
                            <option key={color.id} value=''>{color.value}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.containerColor}>
                    <h3>Agregar Color</h3>
                        <input type="color" value={color} name="" id="" placeholder='Elegir color' onChange={handleChangeColor}/>
                        <p>{color}</p>
                </div>
                <div className={styles.containerButtons}>
                    <button onClick={handleSubmitColors}>Aceptar</button>
                    <button onClick={closeOpenModalSubAdmin}>Cancelar</button>
                </div>
            </div>
        )
    }

    
    

}