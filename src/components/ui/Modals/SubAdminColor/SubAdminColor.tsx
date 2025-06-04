import { FC, useEffect, useState } from 'react'
import { useStoreModal } from '../../../../store/useStoreModal'
import styles from'./SubAdminColor.module.css'
import { getAllColors } from '../../../../cruds/crudColor'
import { IColor } from '../../../../types/IColor'
import useStoreProduct from '../../../../store/useStoreProduct'
import { succesAlert } from '../../../../utils/succesAlert'
import { errorAlert } from '../../../../utils/errorAlert'
import { IProduct } from '../../../../types/IProduct'

interface ISubAdminColor {
    product? : IProduct
}

export const SubAdminColor: FC<ISubAdminColor> = ({product}) => {
    const {modalAdminSubColor, closeAdminSubColor} = useStoreModal()
    const {activeProduct} = useStoreProduct()
    const [addNewColor, setAddNewColor] = useState<string[]>()
    const [colorToDelete, setColorToDelete] = useState<string | null>()
    const [colors, setColors] = useState<IColor[]>()
    

    useEffect(()=>{
        const getColors = async() => {
            const colorsFetched = await getAllColors()
            setColors(colorsFetched)
        }
        getColors()
    },[])

    
    // Manejo los colores para crear producto nuevo
    const handleChangeAddColor = (e : React.ChangeEvent<HTMLInputElement>) => {
            const { value, checked } = e.target;
    
            setAddNewColor((prev) => {
                if (checked) {
                    
                    return prev ? [...prev, value] : [value];
                } else {
                    
                    return prev?.filter((id) => id !== value);
                }
            });
        }
    


    // Agrego los colores al producto nuevo
    const handleSubmitAddColor = (e: React.FormEvent) => {
        e.preventDefault();

        if ((!product || !addNewColor || addNewColor.length === 0)) {
            alert("Por favor, selecciona al menos un color.");
        return;
        }

        try {
            // Busco los objetos IColor según los IDs seleccionados
            const selectedColors: IColor[] = colors?.filter(color =>
                addNewColor.includes(String(color.id))
            ) || [];

            // Evitar duplicados por si ya hay colores cargados
            const uniqueColors = selectedColors.filter(newColor =>
                !product.colors.some(existing => existing.id === newColor.id)
            );

            product.colors = [...(product.colors || []), ...uniqueColors];
            succesAlert('Añadido', 'Se añadieron los colores');
            closeAdminSubColor();
            setAddNewColor([]);
        } catch (error: any) {
            errorAlert('Error', 'No se pudieron agregar los colores');
            console.log(error.message);
        }
    };

    const handleSubmitEditColor = (e: React.FormEvent) => {
        e.preventDefault()

        if(!activeProduct){
            errorAlert('Error', 'No se pudo agregar colores al producto')
            return   
        }

        try {
            // Busco los objetos IColor según los IDs seleccionados
            const selectedColors: IColor[] = colors?.filter(color =>
                addNewColor?.includes(String(color.id))
            ) || [];

            // Evitar duplicados por si ya hay colores cargados
            const uniqueColors = selectedColors.filter(newColor =>
                !activeProduct.colors.some(existing => existing.id === newColor.id)
            );

            activeProduct.colors = [...(activeProduct.colors || []), ...uniqueColors];
            succesAlert('Añadido', 'Se añadieron los colores');
            closeAdminSubColor();
            setAddNewColor([]);
        } catch (error: any) {
            errorAlert('Error', 'No se pudieron agregar los colores');
            console.log(error.message);
        }
    }

    const handleDeleteColor = (e: React.FormEvent) => {
        e.preventDefault()

        if (!activeProduct || !colorToDelete){
            alert('Selecciona un color para eliminar')
            return null
        }

        try {
             // Filtra los colores que no coinciden con el seleccionado
            activeProduct.colors = activeProduct.colors.filter(
                (color) => String(color.id) !== colorToDelete
            );
            succesAlert('Eliminado', 'Se eliminó el color exitosamente');
            setColorToDelete(null); // Limpia la selección actual
            closeAdminSubColor();
        } catch (error : any) {
            console.log(error.message);
            errorAlert('Error', 'No se pudo eliminar el color')
            
        }
    }

    //Manejo de los colores para eliminar un color del producto activo
    const handleChangeDeleteColor = (e : React.ChangeEvent<HTMLSelectElement>) =>{
        const {value} = e.target
        setColorToDelete(value)
    }


    if(modalAdminSubColor.option === 1){
        return (
            <div className={styles.containerPrincipal}>
                <div className={styles.containerTitle}>
                    <h1>Manejo de Colores</h1>
                </div>
                <form action="" onSubmit={handleSubmitAddColor}>
                    <div className={styles.containerAddColor}>
                        <h3>Agregar Color</h3>
                        <div className={styles.listColors}>
                            {colors?.map(color => (
                                <div key={color.id} className={styles.selectColors}>
                                    <input type="checkbox" name="color" id="" value={color.id} onChange={handleChangeAddColor}/>
                                    <div className={styles.containerColor} style={{'backgroundColor' : `${color.value}`, 'border' : '1px solid'}}>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.containerButtons}>
                        <button type='button' onClick={closeAdminSubColor}>Cancelar</button>
                        <button type='submit'>Aceptar</button>
                    </div>
                </form>
            </div>
        )
    }
    else if (modalAdminSubColor.option === 2){


        return (
            <div className={styles.containerPrincipal}>
                <div className={styles.containerTitle}>
                    <h1>Manejo de Colores</h1>
                </div>
                <form action="" onSubmit={handleSubmitEditColor}>
                    <div className={styles.containerAddColor}>
                        <h3>Agregar Color</h3>
                        <div className={styles.listColors}>
                            {colors?.map(color => (
                                <div className={styles.selectColors}>
                                    <input type="checkbox" key={color.id} name="color" id="" value={color.id} onChange={handleChangeAddColor}/>
                                    <div className={styles.containerColor} style={{'backgroundColor' : `${color.value}`, 'border' : '1px solid'}}>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.containerDeleteColors}>
                        <h3>Eliminar un Color</h3>
                        <select name="color" id="" onChange={handleChangeDeleteColor}>
                            <option value="" disabled selected>Sin seleccion</option>
                            {activeProduct?.colors?.map(color => (
                                <option value={color.id} key={color.id} style={{'backgroundColor' : `${color.value}`}}>
                                    {color.value}
                                </option>
                            ))}
                        </select>

                    </div>
                    <div className={styles.containerButtonsEdit}>
                        <button type='submit'>Agregar Color</button>
                        <button onClick={handleDeleteColor}>Eliminar Color</button>
                        <button type='button' onClick={closeAdminSubColor}>Cancelar</button>

                    </div>
                </form>
            </div>
        )
    }
}