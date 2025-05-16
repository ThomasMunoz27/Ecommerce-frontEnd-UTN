import { useEffect, useState } from 'react'
import { useStoreModal } from '../../../../store/useStoreModal'
import useStoreProduct from '../../../../store/useStoreProduct'
import styles from './SubModalAdmin.module.css'
import { getAllCategories } from '../../../../cruds/crudCategory'
import { ICategory } from '../../../../types/ICategory'

export const SubModalAdmin = () => {

    const {closeOpenModalSubAdmin, modalSubAdmin} = useStoreModal()
    const {activeProduct} = useStoreProduct()
    const [categories, setCategories] = useState<ICategory[]>()
    
    useEffect(() => {
        const obtainCategories = async() => {
            const getCategories = await getAllCategories()
            setCategories(getCategories)
        }

        obtainCategories()
    },[])

    if(modalSubAdmin.option === 1){

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
        return (
            <div className={styles.containerPrincipal}>
                <div className={styles.containerButtons}>
                    <div>
                        RODRIGO PUTO
                    </div>
                    <button>Aceptar</button>
                    <button onClick={closeOpenModalSubAdmin}>Cancelar</button>
                </div>
            </div>
        )
    }

    

}