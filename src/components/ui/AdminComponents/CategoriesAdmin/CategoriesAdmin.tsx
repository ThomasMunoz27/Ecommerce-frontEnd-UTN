import { useEffect, useState } from 'react'
import styles from './CategoriesAdmin.module.css'
import { getAllCategories } from '../../../../cruds/crudCategory'
import { ICategory } from '../../../../types/ICategory'

export const CategoriesAdmin = () => {

    const [categories, setCategories] = useState<ICategory[]>()

    useEffect(() => {
        const getCategories = async() => {
            const categoriesFetched = await getAllCategories()
            setCategories(categoriesFetched)
        }
        getCategories()
    },[])

    return (
        <div className={styles.containerPrincipal}>
            <div className={styles.containerTitleAndButton}>
                <div className={styles.containerTitle}>
                    <h1>Gestión de Categorias</h1>
                </div>
                <div className={styles.containerButtons}>
                    <button>
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
                                <button >Editar</button>
                                <button>Eliminar</button>
                            </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    )
}