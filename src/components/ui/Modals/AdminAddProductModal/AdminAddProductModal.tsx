
import { useEffect, useState } from 'react'
import { useStoreModal } from '../../../../store/useStoreModal'

import { SubModalAdmin } from '../SubModalAdmin/SubModalAdmin'
import styles from './AdminAddProductModal.module.css'
import { getAllCategories } from '../../../../cruds/crudCategory'
import { ICategory } from '../../../../types/ICategory'
import { IProduct } from '../../../../types/IProduct'

import { ModalPrice } from '../ModalPrice/ModalPrice'
import { ICreateProduct } from '../../../../types/ICreateProduct'
import { postProduct } from '../../../../cruds/crudProduct'


export const AdminAddProductModal = () => {

    const {modalSubAdmin, closeModalAddAdminProduct, openModalSubAdmin, openModalPrices, modalPrices} = useStoreModal()
    const [categories , setCategories] = useState<ICategory[]>()
    const [newProduct, setNewProduct] = useState<ICreateProduct>({
        name : '',
        description: '',
        productTypeId: 1,
        sex: '',
        prices: {
            purchasePrice: 0,
            salePrice: 0,
            discount: {
                    id: 1,
                    name: '',
                    timeTo: '',
                    dateTo: '',
                    dateFrom: '',
                    timeFrom: '',
                    promotionalPrice: 0,
                    discountDescription: ''
            }
        },
        imageId: 1,
        categoryId: 1,
        sizes : [],
        colors : [],
        stock : 0,
        active: true
    })
    
    useEffect(() => {
        const fetchProducts = async () => {
            const arrayCategories = await getAllCategories()
            setCategories(arrayCategories)
        }
        fetchProducts()
    }, [])

    const handleFileChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setNewProduct((prev) => {
            const updated = { ...prev };
            const keys = name.split('.');
            let ref: any = updated;

            for (let i = 0; i < keys.length - 1; i++) {
                const key = keys[i];
                if (!ref[key]) ref[key] = {};
                ref = ref[key];
            }

            const finalKey = keys[keys.length - 1];

            // Si es número, lo convierte. Si es string, lo deja.
            const parsedValue = isNaN(Number(value)) || value === '' ? value : Number(value);

            ref[finalKey] = parsedValue;

            return updated;
        });
    }

    // Funcion para modificar precios
    const handleSavePrices = (updatePrices : IProduct['prices']) => {
        setNewProduct(prev => ({
            ...prev,
            prices : updatePrices
        }))
    }

    // Funcion que crea el producto
    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
        try {
            const nuevoProducto = await postProduct(newProduct)

            console.log(nuevoProducto);
            
            // Mostrás feedback (opcional)
            alert('Producto creado exitosamente')

            // Cerrás el modal
            closeModalAddAdminProduct()
            
        } catch (error : any) {
            alert('Ocurrio un error en crear el producto')
            console.log(error.message);
        }
    };


    return (
        <div className={styles.containerPrincipal}>
            {modalSubAdmin.type && <div className={styles.modalBackdrop}><SubModalAdmin product={newProduct}/></div>}
            {modalPrices &&
                <div className={styles.modalBackdrop}>
                    <ModalPrice 
                    product={newProduct} 
                    onSavePrices={handleSavePrices}/>
                </div>}
            <div className={styles.containerTitle}>
                <h1>Agregar Producto</h1>
            </div>
            
            <form action="" onSubmit={handleSubmit}>
                <div className={styles.containerData}>
                    <div className={styles.containerInputs}>

                        <input type="text" name="name" id=""  placeholder='Nombre' onChange={handleChange}/>
                        <input type="text" name="stock" id="" placeholder='Stock' onChange={handleChange}/>
                        

                    </div>

                    {/* Recibo id de categoria */}
                    <div className={styles.containerSelectors}>
                        <select name="categoryId" id="" onChange={handleChange}>
                            {categories?.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>

                    {/*Elijo sexo  */}
                        <select name="sex" id="" onChange={handleChange}>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                            <option value="Unisex">Unisex</option>
                        </select>

                    {/* Elijo tipoProdcuto */}
                        <select name="productType" id="" onChange={handleChange}>
                            <option value='calzado'>calzado</option>
                            <option value='indumentaria'>indumentaria</option>
                        </select>

                    </div>

                </div>

                {/* Botones de precios, talles y colores */}
                <div className={styles.containerSizesAndColors}>
                    <button type='button' onClick={openModalPrices}>Manejo de Precios</button>
                    <button type='button' onClick={() => openModalSubAdmin(1)}>Manejo de talles</button>
                    <button type='button' onClick={() => openModalSubAdmin(2)}>Manejo de Colores</button>
                    
                </div>

                {/* Imagen */}
                <div className={styles.imageAndDescription}>
                    <textarea className={styles.description} name="description" id="" placeholder='Descripcion' onChange={handleChange}></textarea>
                    <div className={styles.file}>
                        <label htmlFor="">Imagen</label>
                        <div className={styles.containerImage}>
                            <img src="" alt="" />
                        </div>
                        <input type="file" name="" id="" onChange={handleFileChange} />
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