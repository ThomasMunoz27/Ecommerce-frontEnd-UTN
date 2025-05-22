
import { useEffect, useState } from 'react'
import { useStoreModal } from '../../../../store/useStoreModal'

import { SubModalAdmin } from '../SubModalAdmin/SubModalAdmin'
import styles from './AdminAddProductModal.module.css'
import { getAllCategories } from '../../../../cruds/crudCategory'
import { ICategory } from '../../../../types/ICategory'

export const AdminAddProductModal = () => {

    const {modalSubAdmin, closeModalAddAdminProduct} = useStoreModal()
    const [categories , setCategories] = useState<ICategory[]>()
    
    useEffect(() => {
        const fetchProducts = async () => {
            const arrayCategories = await getAllCategories()
            setCategories(arrayCategories)
        }
        fetchProducts()
    }, [])

    return (
        <div className={styles.containerPrincipal}>
            {modalSubAdmin.type && <div className={styles.modalBackdrop}><SubModalAdmin/></div>}
            <div className={styles.containerTitle}>
                <h1>Agregar Producto</h1>
            </div>
            <form action="">
                <div className={styles.containerData}>
                    <div className={styles.containerInputs}>

                        <input type="text" name="name" id="" placeholder='Nombre'/>
                        <input type="text" name="stock" id="" placeholder='Stock'/>
                        <input type="text" name="" id="" placeholder='Tipo Producto'/>

                    </div>

                    <div className={styles.containerSelectors}>
                        <select name="" id="">
                            {categories?.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>

                        <select name="" id="">
                            <option value="">Masculino</option>
                            <option value="">Femenino</option>
                            <option value="">Unisex</option>
                        </select>

                        <select name="" id="">
                            <option value="">Calzado</option>
                            <option value="">Indumentaria</option>
                        </select>

                    </div>

                </div>

                <div className={styles.containerSizesAndColors}>
                    <button>Manejo de talles</button>
                    <button>Manejo de Colores</button>
                </div>

                <div className={styles.imageAndDescription}>
                    <textarea className={styles.description} name="" id="" placeholder='Descripcion'></textarea>
                    <div className={styles.file}>
                        <label htmlFor="">Imagen</label>
                        <div className={styles.containerImage}>
                            <img src="" alt="" />
                        </div>
                        <input type="file" name="" id="" />
                    </div>
                </div>
                <div className={styles.containerButtons}>
                    <button onClick={closeModalAddAdminProduct}>Cancelar</button>
                    <button>Aceptar</button>
                </div>
            </form>
        </div>
    )
}