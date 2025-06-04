import { useEffect } from 'react'
import styles from './CategoriesAdmin.module.css'
import { deleteCategory, getAllCategories } from '../../../../cruds/crudCategory'

import { succesAlert } from '../../../../utils/succesAlert'
import { errorAlert } from '../../../../utils/errorAlert'

import { useStoreCategory } from '../../../../store/useStoreCategory'
import { useStoreModal } from '../../../../store/useStoreModal'
import { ICategory } from '../../../../types/ICategory'
import { AdminCategory } from '../../Modals/AdminCategory/AdminCategory'

export const CategoriesAdmin = () => {

    
    const {categories, setCategories, fetchCategory, setActiveCategory} = useStoreCategory()
    const {openModalAdminCategory, modalAdminCategory} = useStoreModal()

    useEffect(() => {
        const getCategories = async() => {
            const categoriesFetched = await getAllCategories()
            setCategories(categoriesFetched)
        }
        getCategories()
        fetchCategory()
        
    },[])

    // Funcion para eliminar una categoria
    const handleDelete = async (idCategory : number) => {
        try {
            const deletedCategory = await deleteCategory(idCategory)

            succesAlert('Eliminado', 'La categoria se elimino correctamente')
            console.log(deletedCategory); 
            fetchCategory()
        } catch (error : any) {
            errorAlert('Error', 'Ocurrio un error al eliminar la categoria')
            console.log(error.message);
            
        }
    }

    const handleModalEdit = async (category : ICategory) => {
        openModalAdminCategory()
        setActiveCategory(category)
    }

    const handleModalAdd = () => {
        openModalAdminCategory()
        setActiveCategory(null)
    }

    return (
        <div className={styles.containerPrincipal}>
            <div className={styles.containerTitleAndButton}>
                <div className={styles.containerTitle}>
                    <h1>Gestión de Categorias</h1>
                </div>
                <div className={styles.containerButtons}>
                    <button onClick={handleModalAdd}>
                        Añadir
                    </button>
                </div>
            </div>
            <div className={styles.categoriesTable}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {categories?.map(category => (
                    <tr key={category.id}>
                        <td>{category.id}</td>
                        <td>{category.name}</td>
        
                        <td>
                            <div className={styles.actionButtons}>
                                <button onClick={() => handleModalEdit(category)}>Editar</button>
                                <button onClick={() => handleDelete(category.id!)}>Eliminar</button>
                            </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {modalAdminCategory && <div className={styles.containerBackdrop}><AdminCategory/></div>}
        </div>
    )
}