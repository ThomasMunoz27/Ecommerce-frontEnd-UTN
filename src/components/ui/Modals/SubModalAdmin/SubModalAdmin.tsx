import React, { useEffect, useState } from 'react'
import { useStoreModal } from '../../../../store/useStoreModal'
import useStoreProduct from '../../../../store/useStoreProduct'
import styles from './SubModalAdmin.module.css'
import { getAllCategories } from '../../../../cruds/crudCategory'
import { ICategory } from '../../../../types/ICategory'
import { IColor } from '../../../../types/IColor'

export const SubModalAdmin = () => {

    const {closeOpenModalSubAdmin, modalSubAdmin} = useStoreModal()
    const {activeProduct} = useStoreProduct()
    const [categories, setCategories] = useState<ICategory[]>()
    const [color, setColor] = useState<string>("#000000") // Valor negro por defecto
    
    useEffect(() => {
        const obtainCategories = async() => {
            const getCategories = await getAllCategories()
            setCategories(getCategories)
        }

        obtainCategories()
    },[])

    // Manejo el cambio de estado de los colores
    const handleChangeColor = (e : React.ChangeEvent<HTMLInputElement>) => {
        setColor(e.target.value)
    }

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

    }



    if (modalSubAdmin.option === 1){

        return (
            <div className={styles.containerPrincipal}>
                <div className={styles.containerGeneralSizes}>
                    <h3 className={styles.title}>Agregar Talles</h3>
                    <select name="" id="">
                        <option value="" disabled selected>Talles</option>
                        {categories?.map(category => (
                            <option value="">{category.name}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.containerProductSizes}>
                    <h3 className={styles.title}>Eliminar Talles: {activeProduct?.name}</h3>
                    <select name="" id="">
                        {activeProduct?.sizes.map(size => (
                            <option value="">{size.size}</option>
                        ))}
                    </select>
                </div>
    
                <div className={styles.containerButtons}>
                    <button>Aceptar</button>
                    <button onClick={closeOpenModalSubAdmin}>Cancelar</button>
                </div>
            </div>
        )
    }else if(modalSubAdmin.option === 2){
        return(
            <div className={styles.containerPrincipal}>
                <div className={styles.containerColor}>
                    <h3>Colores del producto: {activeProduct?.name}</h3>
                    <select name="" id="">
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