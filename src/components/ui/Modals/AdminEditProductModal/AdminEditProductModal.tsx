import { useEffect, useState } from 'react'
import useStoreProduct from '../../../../store/useStoreProduct'
import styles from './AdminEditProductModal.module.css'
import { IProduct } from '../../../../types/IProduct'

import { getAllCategories } from '../../../../cruds/crudCategory';
import { ICategory } from '../../../../types/ICategory';
import { useStoreModal } from '../../../../store/useStoreModal';
import { SubModalAdmin } from '../SubModalAdmin/SubModalAdmin';
import { putProduct } from '../../../../cruds/crudProduct';
import { putPrice } from '../../../../cruds/crudPrices';
import { ProductType } from '../../../../types/enums/ProductType';
import { ModalPrice } from '../ModalPrice/ModalPrice';
import { putDiscount } from '../../../../cruds/crudDiscount';






export const AdminEditProductModal = () => {

    const {activeProduct} = useStoreProduct()
    const {openModalSubAdmin, modalSubAdmin, closeModalEditAdminProduct, openModalPrices, modalPrices} = useStoreModal()
    
    
    const [categories, setCategories] = useState<ICategory[] | null>(null)
    const [product, setProduct] = useState<IProduct | null>({
        id: 0,
        name: '',
        description: '',
        productType: 'default' as ProductType, 
        sex: '',
        prices: {
            id: 0,
            purchasePrice: 0,
            salePrice: 0,
            discount: { id: 0,name: '',timeTo: '',dateTo: new Date(),dateFrom: new Date(),timeFrom: '',promotionalPrice: 0,discountDescription: '',}, 
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
        setProduct(activeProduct)
    }
    fetchProducts()
}, [activeProduct])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setProduct(prev => {
        if (!prev) return prev; 

            const keys = name.split('.'); // Divide el nombre por el punto
            let updatedProduct = { ...prev };
            let ref : any = updatedProduct
        
        
            keys.forEach((key, index) => {
                if (index === keys.length - 1) {
                    ref[key] = isNaN(Number(value)) ? value : Number(value); // Asigna el valor
                } else {
                    ref = ref[key];
                }
            });

            return updatedProduct;
        })
    }   

    const handleFileChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return null

        setProduct((prev) => {
            if (!prev) return prev
            return {
                ...prev,
                image: {
                    ...prev.image,
                    url : URL.createObjectURL(file!),
                    file :  file
                }
            }
        })
    }

    const handleSavePrices = (updatedPrices: IProduct['prices']) => {
        setProduct(prev => {
            if (!prev) return prev
            return {
                ...prev,
                prices: updatedPrices
            }
        })
    }

    const handleSubmit = async(e : any) => {
        e.preventDefault()
        if(!activeProduct || !product) {
            alert('No esta definido el producto')
            return null
        }
        try {
            // Atadisimo con alambre
            await putDiscount(product.prices.discount)
            await putPrice(product.prices) 
            await putProduct(product)
            closeModalEditAdminProduct()

        } catch (error) {
            console.log('Ocurrio un error', error);
            alert('Paso un error en modificar el producto')
            closeModalEditAdminProduct()
        }
    }

    return (

        <div className={styles.containerPrincipal}>
            {modalSubAdmin.type && <div className={styles.modalBackdrop}><SubModalAdmin product={activeProduct}/></div>}
            {modalPrices && <div className={styles.modalBackdrop}><ModalPrice product={product!} onSavePrices={handleSavePrices}/></div>}
            <div className={styles.containerTitle}>
                <h1>{activeProduct?.name}</h1>
                <h1>Id: {activeProduct?.id}</h1>
            </div>
            <form action="" onSubmit={handleSubmit}>
                <div className={styles.containerData}>

                    <div className={styles.containerInputs}>

                        <input type="text" name='name' value={product?.name} id='' placeholder='Nombre' onChange={handleChange}/>
                        <input type="number" name="stock" value={product?.stock} id="" placeholder='stock' onChange={handleChange}/>
                        
                        
                    </div>
                    <div className={styles.containerSelectors}>
            
                        <select value={product?.category.id} name="category.id" id="" onChange={handleChange}>
                            {categories?.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                        <select name="sex" id="" onChange={handleChange}>
                            <option value="" defaultValue={product?.sex}>{product?.sex}</option>
                            <option value="masculino">Masculino</option>
                            <option value="femenino">Femenino</option>
                            <option value="unisex">Unisex</option>
                        </select>

                        <select  onChange={handleChange} name="productType" value={product?.productType} id="">
                            <option value={ProductType.calzado}>Calzado</option>
                            <option value={ProductType.indumentaria}>Indumentaria</option>
                        </select>
            
                    </div>
                    
                </div>
                <div className={styles.containerSizesAndColors}>
                    <button type='button' onClick={openModalPrices}>Manejo de precios</button>
                    <button type='button' onClick={() => openModalSubAdmin(1)}>Manejo de Talles</button>
                    <button type='button' onClick={() => openModalSubAdmin(2)}>Manejo de Colores</button>
                </div>
                <div className={styles.imageAndDescription}>
                    <textarea className={styles.description} name="description" id="" placeholder='descripcion' value={product?.description} onChange={handleChange}></textarea>
                    <div className={styles.file}>
                        <label htmlFor="">Imagen</label>
                        <div className={styles.containerImage}>
                            <img src={product?.image.url} alt="" />
                        </div>
                        <input type="file" id='image' onChange={handleFileChange}/>
                    </div>
                </div>
                <div className={styles.containerButtons}>
                    <button type='button' onClick={closeModalEditAdminProduct}>Cancelar</button>
                    <button>Aceptar</button>
                </div>
            </form>
        </div>
    )
}