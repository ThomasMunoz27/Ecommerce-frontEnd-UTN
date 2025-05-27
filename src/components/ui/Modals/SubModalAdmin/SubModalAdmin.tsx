import React, { FC, useEffect, useState } from 'react';
import { useStoreModal } from '../../../../store/useStoreModal';
import useStoreProduct from '../../../../store/useStoreProduct';
import styles from './SubModalAdmin.module.css';
import { IColor } from '../../../../types/IColor';
import { ISize } from '../../../../types/ISize';
import { getAllSizes } from '../../../../cruds/crudSize';
import { IProduct } from '../../../../types/IProduct';
import { ICreateProduct } from '../../../../types/ICreateProduct';

interface ISubModalAdmin {
    product : IProduct | ICreateProduct | null 
}


export const SubModalAdmin : FC<ISubModalAdmin> = ({product}) => {

    const { closeModalSubAdmin, modalSubAdmin } = useStoreModal();
    const { activeProduct } = useStoreProduct();
    const [sizes, setSizes] = useState<ISize[]>([]); // Estado para traer todos los talles
    const [color, setColor] = useState<string>('#000000'); // Valor negro por defecto
    const [newSize, setNewSize] = useState<string>(''); 

    // Traigo todos los talles
    useEffect(() => {
        const obtainCategories = async () => {
            const getSizes = await getAllSizes();
            setSizes(getSizes);
        };

        obtainCategories();
    }, []);



    const actualProduct =   product || activeProduct

    // Manejo el cambio de talle
    const handleChangeSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setNewSize(e.target.value);
    };

    // Funcion para agregar un talle
    const handleSubmitSize = () => {
        if (!actualProduct || !newSize) return;

        const existingSize = actualProduct.sizes.some(size => size.size === newSize);
        if (existingSize) {
            alert('Este producto ya tiene este talle');
            return;
        }

        const addSize = sizes.find(size => size.size === newSize);
        if (!addSize) {
            alert('Talle no válido.');
            return;
        }

        actualProduct.sizes.push(addSize);
        alert("Talle agregado")
        closeModalSubAdmin();
    };

    // Funcion para eliminar talle
    const handleDeleteSize = (sizeId : number) => {
        if (!actualProduct) return;

        actualProduct.sizes = actualProduct.sizes.filter(size => size.id !== sizeId);
        alert('Talle eliminado.');
        closeModalSubAdmin();   
    };




    // Manejo el cambio de color
    const handleChangeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
        setColor(e.target.value);
    };

    // Funcion para subir un talle
    const handleSubmitColors = () => {
        if (!actualProduct) return;

        const existingColor = actualProduct.colors.some(c => c.value === color);
        if (existingColor) {
            alert('Color ya agregado');
            return;
        }

        const maxId = Math.max(...actualProduct.colors.map(c => c.id), 0); // Le agrego id temporal
        const newColor: IColor = {
            id: maxId + 1,
            value: color,
        };
        actualProduct.colors.push(newColor);
        closeModalSubAdmin();
    };

    // Funcion para eliminar un color
    const handleDeleteColor = (colorId: number) => {
        if (!actualProduct) return;

        actualProduct.colors = actualProduct.colors.filter(color => color.id !== colorId);
        alert('Color eliminado.');
        closeModalSubAdmin();
    };



    // Modal para manejar talles
    if (modalSubAdmin.option === 1) {
        return (
            <div className={styles.containerPrincipal}>
                <div className={styles.containerGeneralSizes}>
                    <h3 className={styles.title}>Agregar Talles</h3>
                    <select value={newSize} onChange={handleChangeSize}>
                        <option value="" disabled>
                            Sin selección
                        </option>
                        {sizes.map(size => (
                            <option key={size.id} value={size.size}>
                                {size.size}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.containerProductSizes}>
                    <h3 className={styles.title}>Eliminar Talles de: {actualProduct?.name}</h3>
                    <select onChange={(e) => handleDeleteSize(Number(e.target.value))} defaultValue="">
                        <option value="" disabled>
                            Sin selección
                        </option>
                        {actualProduct?.sizes.map(size => (
                            <option key={size.id} value={size.id}>
                                {size.size}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.containerButtons}>
                    <button onClick={handleSubmitSize}>Aceptar</button>
                    <button onClick={closeModalSubAdmin}>Cancelar</button>
                </div>
            </div>
        );


    } else if (modalSubAdmin.option === 2) {



        // Modal para manejar Colores
        return (
            <div className={styles.containerPrincipal}>
                <div className={styles.containerColor}>
                    <h3>Eliminar Color: {actualProduct?.name}</h3>
                    <select
                        onChange={e => handleDeleteColor(Number(e.target.value))}>
                        <option value="">Sin selección</option>
                        {actualProduct?.colors.map(color => (
                            <option key={color.id} value={color.id}>
                                {color.value}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.containerColor}>
                    <h3>Agregar Color</h3>
                    <input
                        type="color"
                        value={color}
                        onChange={handleChangeColor}
                    />
                    <p>{color}</p>
                </div>
                <div className={styles.containerButtons}>
                    <button onClick={handleSubmitColors}>Aceptar</button>
                    <button onClick={closeModalSubAdmin}>Cancelar</button>
                </div>
            </div>
        );
    }
};
