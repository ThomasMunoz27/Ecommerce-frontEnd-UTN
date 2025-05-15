import { useEffect, useState } from 'react'
import useStoreProduct from '../../../../store/useStoreProduct'
import styles from './AdminProductModal.module.css'
import { IProduct } from '../../../../types/IProduct'
import { getAllProducts } from '../../../../cruds/crudProduct';
import { useStoreCategory } from '../../../../store/useStoreCategory';
import { getAllCategories } from '../../../../cruds/crudCategory';
import { ICategory } from '../../../../types/ICategory';
import { ProductType } from '../../../../types/enums/ProductType';





export const AdminProductModal = () => {

    const {activeProduct, setActiveProduct, setProducts} = useStoreProduct()
    
    
    const [product, setProduct] = useState<IProduct | null>(null)
    const [categories, setCategories] = useState<ICategory[] | null>(null)
    

    useEffect(() => {
    const fetchProducts = async () => {
        const arrayProducts = await getAllProducts() 
        const arrayCategories = await getAllCategories()
        setProducts(arrayProducts)
        setActiveProduct(arrayProducts[0])
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
            <div className={styles.containerTitle}>
                <h1>{activeProduct?.name}</h1>
                <h1>Id: {activeProduct?.id}</h1>
            </div>
            <form action="" >
                <div className={styles.containerData}>

                    <div className={styles.containerInputs}>

                        <input type="text" name='name'value={activeProduct?.name} id='' placeholder='Nombre' onChange={handleChange}/>
                        <input type="number" name="stock" id="" placeholder='stock' onChange={handleChange}/>
                        <input type="number" name="prices" value={activeProduct?.prices.salePrice} id="" placeholder='Precio' onChange={handleChange}/>
                        
                    </div>
                    <div className={styles.containerSelectors}>
            
                        <select value={activeProduct?.category.name} name="" id="" onChange={handleChange}>
                            {categories?.map(category => (
                                <option value={category.id}>{category.name}</option>
                            ))}
                        </select>
                        <select name="" id="">
                            <option value="" disabled selected>Sexo</option>
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
                        <button>Manejo de Talles</button>
                        <button>Manejo de Colores</button>
                    </div>
                <div className={styles.imageAndDescription}>
                    <textarea className={styles.description} name="" id="" placeholder='Descripcion'></textarea>
                    <div className={styles.file}>
                        <label htmlFor="">Imagen</label>
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