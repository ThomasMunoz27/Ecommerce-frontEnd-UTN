
import { useEffect, useState } from 'react'
import { useStoreModal } from '../../../../store/useStoreModal'

import { SubModalAdmin } from '../SubModalAdmin/SubModalAdmin'
import styles from './AdminAddProductModal.module.css'
import { getAllCategories } from '../../../../cruds/crudCategory'
import { ICategory } from '../../../../types/ICategory'
import { IProduct } from '../../../../types/IProduct'
import { ProductType } from '../../../../types/enums/ProductType'
import { ModalPrice } from '../ModalPrice/ModalPrice'
import { postDiscount } from '../../../../cruds/crudDiscount'
import { postPrice } from '../../../../cruds/crudPrices'
import { postProduct } from '../../../../cruds/crudProduct'

export const AdminAddProductModal = () => {

    const {modalSubAdmin, closeModalAddAdminProduct, openModalSubAdmin, openModalPrices, modalPrices} = useStoreModal()
    const [categories , setCategories] = useState<ICategory[]>()
    const [newProduct, setNewProduct] = useState<IProduct>({
        name: '',
        description: '',
        productType: '' as ProductType, 
        sex: '',
        prices: {
            purchasePrice: 0,
            salePrice: 0,
            discount: { id: 0,name: '',timeTo: '',dateTo: '',dateFrom: '',timeFrom: '',promotionalPrice: 0,discountDescription: '',}, 
        },
        image: {url: 'https://via.placeholder.com/150' },
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

    const handleFileChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return null

        setNewProduct((prev) => {
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target

        setNewProduct(prev => {
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
        // Creo el descuento
        const discountResponse = await postDiscount({
            name: newProduct.prices.discount.name,
            dateFrom: newProduct.prices.discount.dateFrom,
            timeFrom: newProduct.prices.discount.timeFrom,
            dateTo: newProduct.prices.discount.dateTo,
            timeTo: newProduct.prices.discount.timeTo,
            promotionalPrice: newProduct.prices.discount.promotionalPrice,
            discountDescription: newProduct.prices.discount.discountDescription,
        });

        console.log(discountResponse);
        
        

        // 2. Post del precio, con el descuento que acabamos de crear
        const priceResponse = await postPrice({
            purchasePrice: newProduct.prices.purchasePrice,
            salePrice: newProduct.prices.salePrice,
            discount: discountResponse
        });

        console.log(priceResponse);
        

        // 3. Post del producto

        if(newProduct.category){
            const findCategory = categories?.find(cat => cat.id === newProduct.category.id)
            if(findCategory){
                newProduct.category = findCategory
            }
        }

        const productToSend = {
            name: newProduct.name,
            description: newProduct.description,
            productType: newProduct.productType,
            sex: newProduct.sex,
            prices: priceResponse,
            image: newProduct.image, 
            category: newProduct.category,
            sizes: newProduct.sizes,
            colors: newProduct.colors,
            stock: newProduct.stock,
        };

        
        
        await postProduct(productToSend);
        console.log(productToSend);

        alert('Producto creado con éxito');
        closeModalAddAdminProduct();

    } catch (error) {
        console.error('Error al crear el producto:', error);
        alert('Hubo un error al crear el producto. Verificá los datos e intentá nuevamente.');
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