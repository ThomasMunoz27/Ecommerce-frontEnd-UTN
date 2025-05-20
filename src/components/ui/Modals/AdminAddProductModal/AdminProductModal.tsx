import { useEffect, useState } from 'react'
import useStoreProduct from '../../../../store/useStoreProduct'
import styles from './AdminProductModal.module.css'
import { IProduct } from '../../../../types/IProduct'
import { getAllProducts } from '../../../../cruds/crudProduct';
import { getAllCategories } from '../../../../cruds/crudCategory';
import { ICategory } from '../../../../types/ICategory';
import { ProductType } from '../../../../types/enums/ProductType';
import { useStoreModal } from '../../../../store/useStoreModal';
import { SubModalAdmin } from '../SubModalAdmin/SubModalAdmin';





export const AdminProductModal = () => {

    const {activeProduct, setActiveProduct, setProducts} = useStoreProduct()
    const {openModalSubAdmin, modalSubAdmin} = useStoreModal()
    
    const [product, setProduct] = useState<IProduct | null>(null)
    const [categories, setCategories] = useState<ICategory[] | null>(null)
    

    useEffect(() => {
    const fetchProducts = async () => {
        const arrayProducts = await getAllProducts() 
        const arrayCategories = await getAllCategories()
        setProducts(arrayProducts)
        setActiveProduct(arrayProducts[1])
        setProduct(activeProduct)
        setCategories(arrayCategories)
            
        
    }
    fetchProducts()
}, [])

    
    const handleChange = () => {

    }

    const handleSubmit = () => {

    }

    return (

        <div className={styles.containerPrincipal}>
            {modalSubAdmin.type && <div className={styles.modalBackdrop}><SubModalAdmin/></div>}
            <div className={styles.containerTitle}>
                <h1>{activeProduct?.name}</h1>
                <h1>Id: {activeProduct?.id}</h1>
            </div>
            <form action="" onSubmit={handleSubmit}>
                <div className={styles.containerData}>

                    <div className={styles.containerInputs}>

                        <input type="text" name='name' value={activeProduct?.name} id='' placeholder='Nombre' onChange={handleChange}/>
                        <input type="number" name="stock" id="" placeholder='stock' onChange={handleChange}/>
                        <input type="number" name="prices" value={activeProduct?.prices.salePrice} id="" placeholder='Precio' onChange={handleChange}/>
                        
                    </div>
                    <div className={styles.containerSelectors}>
            
                        <select value={activeProduct?.category.name} name="" id="" onChange={handleChange}>
                            {categories?.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                        <select name="" id="">
                            <option value="" defaultValue={activeProduct?.sex}>{activeProduct?.sex}</option>
                            <option value="masculino">Masculino</option>
                            <option value="femenino">Femenino</option>
                            <option value="otro">Otro</option>
                        </select>
                        <select value={activeProduct?.productType} name="" id="">
                            <option value={product?.productType}>{ProductType.calzado}</option>
                            <option value={product?.productType}>{ProductType.indumentaria}</option>
                        </select>
            
                    </div>
                    
                </div>
                    <div className={styles.containerSizesAndColors}>
                        <button type='button' onClick={() => openModalSubAdmin(1)}>Manejo de Talles</button>
                        <button type='button' onClick={() => openModalSubAdmin(2)}>Manejo de Colores</button>
                    </div>
                <div className={styles.imageAndDescription}>
                    <textarea className={styles.description} name="" id="" placeholder='Descripcion'></textarea>
                    <div className={styles.file}>
                        <label htmlFor="">Imagen</label>
                        <div className={styles.containerImage}>
                            <img src={activeProduct?.image.url} alt="" />
                        </div>
                        <input type="file" />
                    </div>
                </div>
                <div className={styles.containerButtons}>
                    <button>Cancelar</button>
                    <button>Aceptar</button>
                </div>
            </form>
        </div>
    )
}