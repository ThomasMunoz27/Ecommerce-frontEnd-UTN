import React, { FC, useEffect, useState } from 'react'
import { useStoreModal } from '../../../../store/useStoreModal'
import styles from './SubAdminSize.module.css'
import { getAllSizes } from '../../../../cruds/crudSize'
import { ISize } from '../../../../types/ISize'
import { ICreateProduct } from '../../../../types/ICreateProduct'
import { errorAlert } from '../../../../utils/errorAlert'
import { succesAlert } from '../../../../utils/succesAlert'
import useStoreProduct from '../../../../store/useStoreProduct'

interface ISubAdminSize {
    product? : ICreateProduct
}


export const SubAdminSize : FC<ISubAdminSize> = ({product}) => {
    const {modalAdminSubSize} = useStoreModal()
    const {activeProduct} = useStoreProduct()
    const [sizes, setSizes] = useState<ISize[]>()
    const [sizeToDelete, setSizeToDelete] = useState<string | null>()
    const {closeAdminSubSize} = useStoreModal()
    const [addSizeInProduct, setAddSizeInProduct] = useState<string[]>()

    useEffect(() => {
        const getSizes = async () => {
            const sizesFetched = await getAllSizes() // Llamo a todos los talles
            setSizes(sizesFetched)
        }
        getSizes()
    },[])


    // Manejo de los talles para crear un producto nuevo
    const handleChangeAddSize = (e : React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;

        setAddSizeInProduct((prev) => {
            if (checked) {
                // Agregar el tamaño seleccionado
                return prev ? [...prev, value] : [value];
            } else {
                // Eliminar el tamaño deseleccionado
                return prev?.filter((id) => id !== value);
            }
        });
    }

    // Manejo de los talles para eliminar un talle  del producto activo
    const handleChangeDeleteSize = (e : React.ChangeEvent<HTMLSelectElement>) => {
        const {value} = e.target
        setSizeToDelete(value)
    }   

    // Agrego talle al producto nuevo
    const handleAddSize = (e : React.FormEvent) => {
        e.preventDefault()
        if (!product || !addSizeInProduct || addSizeInProduct.length === 0) {
            alert("Por favor, selecciona al menos un tamaño.");
            return;
        }
        try {
            product.sizes = [...(product.sizes || []), ...addSizeInProduct]
            succesAlert('Añadido', 'Se añadieron los talles')
            closeAdminSubSize()
            setAddSizeInProduct([])
        } catch (error : any) {
            errorAlert('Error', 'No se puede agregar el talle')
            console.log(error.message);
            
        }
    }


    // Edito el producto activo
    const handleEditSize = (e: React.FormEvent) => {
    e.preventDefault();

    if (!activeProduct || !addSizeInProduct || addSizeInProduct.length === 0) {
        alert('Selecciona al menos un talle para agregar');
        return;
    }

    // Verificar si ya existe algún talle en el producto activo
    const existingSize = addSizeInProduct.some((sizeId) =>
        activeProduct.sizes.some((size) => String(size.id) === sizeId)
    );

    if (existingSize) {
        errorAlert('Error', 'Un talle ya se encuentra asignado al producto');
        return;
    }

    try {
        // Busco los talles seleccionados por ID
        const selectedSizes = sizes?.filter((size) =>
            addSizeInProduct.some((id) => String(size.id) === id)
        );

        if (!selectedSizes || selectedSizes.length === 0) {
            throw new Error('No se encontraron talles seleccionados');
        }

        // Add los nuevos talles al producto activo
        activeProduct.sizes = [...activeProduct.sizes, ...selectedSizes];

        succesAlert('Actualizado', 'Talles añadidos correctamente');
        closeAdminSubSize()
    } catch (error: any) {
        errorAlert('Error', 'Ocurrio un error al agregar un talle');
        console.error(error.message);
    }
};
    
    // Elimino un talle del producto activo
    const handleDeleteSize = () => {
        if (!activeProduct || !sizeToDelete) {
            alert('Selecciona un talle para eliminar');
            return;
        }

        try {
            // Filtra los talles que no coinciden con el seleccionado
            activeProduct.sizes = activeProduct.sizes.filter(
                (size) => String(size.id) !== sizeToDelete
            );

            succesAlert('Eliminado', 'Se eliminó el talle exitosamente');
            setSizeToDelete(null); // Limpia la selección actual
            closeAdminSubSize();
        } catch (error: any) {
            errorAlert('Error', 'Ocurrió un error al eliminar el talle');
            console.error(error.message);
        }
    }


    if (modalAdminSubSize.option === 1) {
        return(
            <div className={styles.containerPrincipal}>
                <div className={styles.containerTitle}>
                    <h1>Manejo de Talles</h1>
                </div>
                <form action="" onSubmit={handleAddSize}>
                    <div className={styles.containerAddSize}>
                        <h3>Talle a agregar</h3>
                        <div className={styles.containerSizes}>
                            {sizes?.map(size => (
                                <div style={{'display' : 'flex', 'gap' : '2px'}}>
                                    <input type="checkbox" name="size" id="" value={size.id} onChange={handleChangeAddSize}/>
                                    <p>{size.size}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.containerButtons}>
                        <button onClick={closeAdminSubSize}>Cancelar</button>
                        <button type='submit'>Aceptar</button>
                    </div>
                </form>
                
            </div>
        )
    } else if(modalAdminSubSize.option == 2) {

        // Editar talles del producto

        return (
            <div className={styles.containerPrincipal}>
                <div className={styles.containerTitle}>
                    <h1>Manejo de Talles</h1>
                </div>
                <form action="" onSubmit={handleEditSize}>
                    <div className={styles.containerAddSize}>
                        <h3>Talle a agregar</h3>
                        <div className={styles.containerSizes}>
                            {sizes?.map(size => (
                                <div style={{'display' : 'flex', 'gap' : '2px'}}>
                                    <input type="checkbox" name="size" id="" value={size.id} onChange={handleChangeAddSize}/>
                                    <p>{size.size}</p>
                                </div>
                            ))}
                        </div>
                        <div className={styles.containerSelect}>
                            <h3>Eliminar Talle</h3>
                            <select name="size" id="" onChange={handleChangeDeleteSize}>
                                <option value='' disabled selected>Sin Seleccion</option>
                                {activeProduct?.sizes.map(size => (
                                    <option key={size.id} value={size.id} >{size.size}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className={styles.containerButtonsEdit}>
                        <button type='submit'>Agreagr Talle</button>
                        <button onClick={handleDeleteSize}>Eliminar Talle</button>
                        <button onClick={closeAdminSubSize}>Cancelar</button>
                    </div>
                </form>
                
            </div>
        )
    }
}