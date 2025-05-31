import { FC, useEffect, useState } from 'react'
import { useStoreModal } from '../../../../store/useStoreModal'
import styles from './SubAdminCategory.module.css'
import { getAllCategories } from '../../../../cruds/crudCategory'
import { ICategory } from '../../../../types/ICategory'
import useStoreProduct from '../../../../store/useStoreProduct'
import { ICreateProduct } from '../../../../types/ICreateProduct'
import { succesAlert } from '../../../../utils/succesAlert'
import { errorAlert } from '../../../../utils/errorAlert'

interface ISubAdminCategory {
    product? : ICreateProduct
}

export const SubAdminCategory : FC<ISubAdminCategory> = ({product}) => {

    const {modalAdminSubCategory, closeAdminSubCategory} = useStoreModal()
    const {activeProduct} = useStoreProduct()

    const [categories, setCategories] = useState<ICategory[]>()
    const [addCategory, setAddCategory] = useState<string[]>([])
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

        setAddCategory((prev) => {
            if(checked){
                // Agregar la categoria seleccionada
                return prev ? [...prev, value] : [value];
            } else {
                // Eliminar la categoria deseleccionado
                return prev?.filter((id) => id !== value);
            }
        })
    }

    // Manejo de las categorias para eliminar una categoria del producto activo
    const handleChangeDeleteCategory = (e : React.ChangeEvent<HTMLSelectElement>) => {
            const {value} = e.target
            setCategoryToDeleted(value)
        }
        
    // Agrego categoria al producto nuevo
    const handleAddCategory = (e : React.FormEvent) => {
        e.preventDefault()
        if (!product || !addCategory || addCategory.length === 0) {
            alert("Por favor, selecciona al menos una categoria.");
            return;
        }
        try {
            product.categoryId = [...(product.categoryId || []), ...addCategory]
            succesAlert('Añadido', 'Se añadieron las categorias')
            closeAdminSubCategory()
            setAddCategory([])

        } catch (error : any) {

            errorAlert('Error', 'No se puede agregar el talle')
            console.log(error.message);    
        }
    }

    // Elimino una categoria del producto activo
        const handleDeleteCategory = () => {
            if (!activeProduct || !categoryToDeleted) {
                alert('Selecciona una categoria para eliminar');
                return;
            }
    
            try {
                // Filtra las categorias que no coinciden con la seleccionada
                activeProduct.category = activeProduct.category.filter(
                    (category) => String(category.id) !== categoryToDeleted
                );
    
                succesAlert('Eliminado', 'Se eliminó la categoria exitosamente');
                setCategoryToDeleted(null); // Limpia la selección actual
                closeAdminSubCategory();
            } catch (error: any) {
                errorAlert('Error', 'Ocurrió un error al eliminar la categoria');
                console.error(error.message);
            }
        }

    // Edito el producto activo
    const handleEditCategory = (e: React.FormEvent) => {
        e.preventDefault()

        if (!activeProduct || !addCategory || addCategory.length === 0) {
                alert('Selecciona al menos un talle para agregar');
                return;
            }
        
            // Verificar si ya existe alguna categoria en el producto activo
            const existingCategory = addCategory.some((categoryId) =>
                activeProduct.category.some((category) => String(category.id) === categoryId)
            );
        
            if (existingCategory) {
                errorAlert('Error', 'Una categoria ya se encuentra asignada al producto');
                return;
            }
        
            try {
                // Busco las categorias seleccionadas por ID
                const selectedCategory = categories?.filter((category) =>
                    addCategory.some((id) => String(category.id) === id)
                );
        
                if (!selectedCategory || selectedCategory.length === 0) {
                    throw new Error('No se encontraron categorias seleccionadas');
                }
        
                // Add las nuevas categorias al producto activo
                activeProduct.category = [...activeProduct.category, ...selectedCategory];
        
                succesAlert('Actualizado', 'Categorias añadidas correctamente');
                closeAdminSubCategory()
            } catch (error: any) {
                errorAlert('Error', 'Ocurrio un error al agregar una categoria');
                console.error(error.message);
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
                                        <input type="checkbox" name="category.id" id="" onChange={handleChangeAddCategory}/>
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
                                        <input type="checkbox" name="category.id" id="" onChange={handleAddCategory}/>
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