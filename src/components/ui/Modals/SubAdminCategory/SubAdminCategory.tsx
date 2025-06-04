import { FC, useEffect, useState } from 'react'
import { useStoreModal } from '../../../../store/useStoreModal'
import styles from './SubAdminCategory.module.css'
import { getAllCategories } from '../../../../cruds/crudCategory'
import { ICategory } from '../../../../types/ICategory'
import useStoreProduct from '../../../../store/useStoreProduct'
import { succesAlert } from '../../../../utils/succesAlert'
import { errorAlert } from '../../../../utils/errorAlert'
import { IProduct } from '../../../../types/IProduct'


interface ISubAdminCategory {
    product? : IProduct 
}

export const SubAdminCategory : FC<ISubAdminCategory> = ({product}) => {

    const {modalAdminSubCategory, closeAdminSubCategory} = useStoreModal()
    const {activeProduct} = useStoreProduct()

    const [categories, setCategories] = useState<ICategory[]>([])
    const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([])
    const [categoryToDeleted, setCategoryToDeleted] = useState<string | null>()


    useEffect(() => {
        const getCategories = async() => {
            const ctaegoriesfetched = await getAllCategories()
            setCategories(ctaegoriesfetched)
        }
        getCategories()
    },[])


    // Manejo de las categorias para crear un producto
    const handleChangeAddCategory = (e : React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;

        setSelectedCategoryIds((prev) =>
            checked ? [...prev, value] : prev.filter((id) => id !== value)
        )
    }

    // Manejo de las categorias para eliminar una categoria del producto activo
    const handleChangeDeleteCategory = (e : React.ChangeEvent<HTMLSelectElement>) => {
            const {value} = e.target
            setCategoryToDeleted(value)
        }
        
    // Agrego categoria al producto nuevo
    const handleAddCategory = (e: React.FormEvent) => {
        e.preventDefault()

        if (!product || selectedCategoryIds.length === 0) {
            alert('Selecciona al menos una categoría.')
            return
        }   

        try {
            const selectedCategories = categories.filter((cat) =>
            selectedCategoryIds.includes(String(cat.id))
            )

            product.category = [...(product.category || []), ...selectedCategories]

            succesAlert('Añadido', 'Se añadieron las categorías')
            closeAdminSubCategory()
            setSelectedCategoryIds([])
        } catch (error: any) {
            errorAlert('Error', 'No se pudieron agregar las categorías')
            console.error(error.message)
        }
    }

    // Elimino una categoria del producto activo
    const handleDeleteCategory = () => {
        if (!activeProduct || !categoryToDeleted) {
            alert('Selecciona una categoría para eliminar')
            return
        }

        try {
            activeProduct.category = activeProduct.category.filter(
                (cat) => String(cat.id) !== categoryToDeleted
            )

            succesAlert('Eliminado', 'Categoría eliminada exitosamente')
            setCategoryToDeleted(null)
            closeAdminSubCategory()
        } catch (error: any) {
            errorAlert('Error', 'Ocurrió un error al eliminar la categoría')
            console.error(error.message)
        }
    }

    // Edito el producto activo
    const handleEditCategory = (e: React.FormEvent) => {
        e.preventDefault()

        if (!activeProduct || selectedCategoryIds.length === 0) {
            alert('Selecciona al menos una categoría para agregar.')
            return
        }

        const alreadyExists = selectedCategoryIds.some((id) =>
            activeProduct.category.some((cat) => String(cat.id) === id)
        )

        if (alreadyExists) {
            errorAlert('Error', 'Una categoría ya está asignada al producto')
            return
        }

        try {
            const selectedCategories = categories.filter((cat) =>
                selectedCategoryIds.includes(String(cat.id))
            )

            activeProduct.category = [...activeProduct.category, ...selectedCategories]

            succesAlert('Actualizado', 'Categorías añadidas correctamente')
            closeAdminSubCategory()
            setSelectedCategoryIds([])
        } catch (error: any) {
            errorAlert('Error', 'Ocurrió un error al agregar categorías')
            console.error(error.message)
        }
    }



    if (modalAdminSubCategory.option == 1) {
        return (
            <div className={styles.containerPrincipal}>
                <div className={styles.containerTitle}>
                    <h1>Manejo de Categorias</h1>
                </div>
                <form action="" onSubmit={handleAddCategory}>
                    <div className={styles.containerAddCategory}>
                        <h3>Agregar Categoria</h3>
                        <div className={styles.containerCategories}>
                            {categories?.map(category => (
                            
                                    <div style={{'display' : 'flex', 'gap' : '2px'}}>
                                        <input type="checkbox" name="category" id="" value={category.id} onChange={handleChangeAddCategory}/>
                                        <p>{category.name}</p>
                                    </div>
                        
                            
                            ))}
                        </div>
                    </div>
                    <div className={styles.containerButtons}>
                        <button onClick={closeAdminSubCategory}>Cancelar</button>
                        <button>Aceptar</button>
                    </div>
                </form>
            </div>
        )
    } else if (modalAdminSubCategory.option === 2) {



        return (
            <div className={styles.containerPrincipal}>
                <div className={styles.containerTitle}>
                    <h1>Manejo de Categorias</h1>
                </div>
                <form action="" onSubmit={handleEditCategory}>
                    <div className={styles.containerAddCategory}>
                        <h3>Agregar Categoria</h3>
                        <div className={styles.containerCategories}>
                            {categories?.map(category => (
                            
                                    <div style={{'display' : 'flex', 'gap' : '2px'}}>
                                        <input type="checkbox" name="category.id" id="" value={category.id} onChange={handleChangeAddCategory}/>
                                        <p>{category.name}</p>
                                    </div>
                        
                            
                            ))}
                        </div>
                    </div>

                    <div className={styles.containerDeleteCategory}>
                        <h3>Eliminar una categoria</h3>
                        <select name="category" id="" onChange={handleChangeDeleteCategory}>
                            <option value="">Sin Seleccion</option>
                            {activeProduct?.category.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.containerButtonsEdit}>
                        <button type='submit'>Agregar Categoria</button>
                        <button onClick={handleDeleteCategory}>Eliminar Categoria</button>
                        <button onClick={closeAdminSubCategory}>Cancelar</button>
                    </div>
                </form>
            </div>
        )
    }   
}