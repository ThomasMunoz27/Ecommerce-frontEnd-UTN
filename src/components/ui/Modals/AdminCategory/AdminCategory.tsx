import { useState } from "react"
import { useStoreCategory } from "../../../../store/useStoreCategory"
import { useStoreModal } from "../../../../store/useStoreModal"
import styles from './AdminCategory.module.css'
import { ICategory } from "../../../../types/ICategory"
import { postCategory, putCategory } from "../../../../cruds/crudCategory"
import { succesAlert } from "../../../../utils/succesAlert"
import { formCategorySchema } from "../../../../yupSchemas/formCategorySchema"

export const AdminCategory = () => {

    const {activeCategory, fetchCategory} = useStoreCategory()
    const {closeModalAdminCategory} = useStoreModal()
    const [category, setCategory] = useState<ICategory>({
        id : activeCategory?.id,
        name :activeCategory?.name  || ''
    }) 
    const [formErrors, setFormErrors] =useState<Record<string, string>>({})

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setCategory((prev) => ({
            ...prev,
            [name] : value
        }))
        
    }

    
    const handleSubmit = async(e : React.FormEvent) => {
        e.preventDefault()
        if (activeCategory){
            try {
                await formCategorySchema.validate(category, {abortEarly: false})
                await putCategory(category)
                succesAlert('Editado', 'Se edito la categoria')
                fetchCategory()
                closeModalAdminCategory()
            } catch (error : any) {
                const errors: Record<string,string> ={}
                if(error.inner){
                    error.inner.forEach((validationError:any) =>{
                        errors[validationError.path] = validationError.message;
                    });
                }else{
                    error.general = error.message
                }
                setFormErrors(errors)
            }
        } else {
            try {
                await formCategorySchema.validate(category, {abortEarly: false})

                await postCategory(category)
                succesAlert('Creado', 'Se creo la categoria exitosamente')
                fetchCategory()
                closeModalAdminCategory()
            } catch (error : any) {
                const errors: Record<string,string> ={}
                if(error.inner){
                    error.inner.forEach((validationError:any) =>{
                        errors[validationError.path] = validationError.message;
                    });
                }else{
                    error.general = error.message
                }
                setFormErrors(errors)
            }
        }
    }

    return (
        <div className={styles.containerPrincipal}>
            <h1>Manejo de Categorias</h1>
            <form action="" onSubmit={handleSubmit}>
                <div className={styles.containerValue}>
                    <h3>{activeCategory ? 'Editar Categoria' : 'Agregar Categoria'}</h3>
                    <input type="text" name="name" value={category.name} placeholder="Nombre" onChange={handleChange}/>
                    {formErrors.name && <p className={styles.errorMessage}>{formErrors.name}</p>}
                </div>
                <div className={styles.containerButtons}>
                    <button onClick={closeModalAdminCategory}>Cancelar</button>
                    <button type="submit">Aceptar</button>
                </div>
            </form>
        </div>
    )
}