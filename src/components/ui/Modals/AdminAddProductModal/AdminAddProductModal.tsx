
import { useEffect, useState } from 'react'
import { useStoreModal } from '../../../../store/useStoreModal'

import { SubModalAdmin } from '../SubModalAdmin/SubModalAdmin'
import styles from './AdminAddProductModal.module.css'
import { getAllCategories } from '../../../../cruds/crudCategory'
import { ICategory } from '../../../../types/ICategory'
import { IProduct } from '../../../../types/IProduct'
import { ProductType } from '../../../../types/enums/ProductType'
import { ModalPrice } from '../ModalPrice/ModalPrice'

export const AdminAddProductModal = () => {

    const {modalSubAdmin, closeModalAddAdminProduct, openModalSubAdmin, openModalPrices, modalPrices} = useStoreModal()
    const [categories , setCategories] = useState<ICategory[]>()
    const [newProduct, setNewProduct] = useState<IProduct>({
        id: 0,
        name: '',
        description: '',
        productType: '' as ProductType, 
        sex: '',
        prices: {
            id: 0,
            purchasePrice: 0,
            salePrice: 0,
            discount: { id: 0,name: '',timeTo: '',dateTo: '',dateFrom: '',timeFrom: '',promotionalPrice: 0,discountDescription: '',}, 
        },
        image: {id : 0, url: 'https://via.placeholder.com/150' },
        category: { id: 0, name: '' },
        sizes: [],
        colors: [],
        stock: 0,
    })
    
    useEffect(() => {
        const fetchProducts = async () => {
            const arrayCategories = await getAllCategories()
            setCategories(arrayCategories)
        }
        fetchProducts()
    }, [])

    const handleFileChange = () => {

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target

        console.log(name, value);
        

    }

    // Funcion para modificar precios
    const handleSavePrices = (updatePrices : IProduct['prices']) => {
        setNewProduct(prev => ({
            ...prev,
            prices : updatePrices
        }))
    }

    const handleSubmit = () => {

    }

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

                    <div className={styles.containerSelectors}>
                        <select name="category.id" id="" onChange={handleChange}>
                            {categories?.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>

                        <select name="sex" id="" onChange={handleChange}>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                            <option value="Unisex">Unisex</option>
                        </select>

                        <select name="productType" id="" onChange={handleChange}>
                            <option value={ProductType.calzado}>calzado</option>
                            <option value={ProductType.indumentaria}>indumentaria</option>
                        </select>

                    </div>

                </div>

                <div className={styles.containerSizesAndColors}>
                    <button type='button' onClick={openModalPrices}>Manejo de Precios</button>
                    <button type='button' onClick={() => openModalSubAdmin(1)}>Manejo de talles</button>
                    <button type='button' onClick={() => openModalSubAdmin(2)}>Manejo de Colores</button>
                    
                </div>

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