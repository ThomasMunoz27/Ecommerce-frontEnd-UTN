import React, { useEffect, useState } from 'react'
import { useStoreModal } from '../../../../store/useStoreModal'
import styles from './AdminProduct.module.css'
import { ICategory } from '../../../../types/ICategory'
import { getAllCategories } from '../../../../cruds/crudCategory'
import { ProductType } from '../../../../types/enums/ProductType'
import { ICreateProduct } from '../../../../types/ICreateProduct'
import { SubAdminSize } from '../SubAdminSizes/SubAdminSizes'
import useStoreProduct from '../../../../store/useStoreProduct'
import { IProduct } from '../../../../types/IProduct'

export const AdminProduct = () => {
    const {modalAdminProduct, closeModalAdminProduct, modalAdminSubSize, openAdminSubSize} = useStoreModal()
    const {activeProduct} = useStoreProduct()
    const [categories, setCategories] = useState<ICategory[]>()
    const [newProduct, setNewProduct] = useState<ICreateProduct>({
        name : '',
        description : '',
        productTypeId : 0,
        sex : '',
        prices : 0,
        imageId : 0,
        categoryId : 0,
        sizes: [],
        colors : [],
        stock : 0,
        active: true

    })

    useEffect(() => {
        const getCategories = async() => {
            const categoriesFetched = await getAllCategories()
            setCategories(categoriesFetched)
        }
        getCategories()
    },[])
    


    const handleChangeCreate = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target
        console.log(name, value);
        
    }

    const handleAddProduct = (e : React.FormEvent) => {
        e.preventDefault()
    }

    
    if (modalAdminProduct.option === 1){

        // Crear Producto

        return(
            <div className={styles.containerPrincipal}>
                <div className={styles.containerTitle}>
                    <h1>Crear Producto</h1>
                </div>
                <form action="" onSubmit={handleAddProduct}>
                    <div className={styles.containerData}>
                        <div className={styles.containerColumn}>
                            <label htmlFor="">Nombre</label>
                            <input type="text" name="name" id="" placeholder='Nombre' onChange={handleChangeCreate}/>
                            <label htmlFor="">Stock</label>
                            <input type="number" name="" id="" placeholder='Stock' onChange={handleChangeCreate}/>
                            <label htmlFor="">Sexo</label>
                            <input type="text" name="" id="" placeholder='sexo' onChange={handleChangeCreate}/>

                        </div>
                        <div className={styles.containerColumn}>

                            <label htmlFor="">Categoria</label>
                            <select name="category.id" id="" onChange={handleChangeCreate}>
                                <option value="" selected disabled>Categorias</option>
                                {categories?.map(category => (
                                    <option key={category.id} value={category.id} >{category.name}</option>
                                ))}
                            </select>

                            <label htmlFor="">Tipo Producto</label>
                            <select name="productType" id="" onChange={handleChangeCreate}>
                                <option value="">TipoProducto</option>
                                <option value="calzado">{ProductType.calzado}</option>
                                <option value="indumentaria">{ProductType.indumentaria}</option>
                            </select>

                        </div>
                    </div>
                    <div className={styles.containerHandleButtons}>
                        <button onClick={() => openAdminSubSize(1)}>Manejo de Talles</button>
                        <button>Manejo de Precios</button>
                        <button>Manejo de Colores</button>
                    </div>
                    <div className={styles.containerDescription}>
                        <label htmlFor="">Descripcion</label>
                        <textarea name="description" id="" placeholder='Descripcion' onChange={handleChangeCreate}></textarea>
                    </div>
                    <div className={styles.containerImage}>
                        <label htmlFor="">Imagen</label>
                        <input type="text" name="image.url" id="" onChange={handleChangeCreate}/>
                    </div>
                    <div className={styles.containerButtons}>
                        <button onClick={closeModalAdminProduct}>Cancelar</button>
                        <button type='submit'>Aceptar</button>
                    </div>
                </form>
                {modalAdminSubSize.type && <div className={styles.modalBackdrop}><SubAdminSize product={newProduct}/></div>}
            </div>
        )
    }else if(modalAdminProduct.option === 2){


        // Editar Producto

        return(
            <div className={styles.containerPrincipal}>
                <div className={styles.containerTitle}>
                    <h1>Editar Producto</h1>
                </div>
                <form action="">
                    <div className={styles.containerData}>
                        <div className={styles.containerColumn}>
                            <label htmlFor="">Nombre</label>
                            <input type="text" name="name" id="" placeholder='Nombre' value={activeProduct?.name}/>
                            <label htmlFor="">Stock</label>
                            <input type="number" name="" id="" placeholder='Stock' value={activeProduct?.stock}/>
                            <label htmlFor="">Sexo</label>
                            <input type="text" name="" id="" placeholder='sexo' value={activeProduct?.sex}/>

                        </div>
                        <div className={styles.containerColumn}>

                            <label htmlFor="">Categoria</label>
                            <select name="" id="">
                                <option value="" selected disabled>Categorias</option>
                                {categories?.map(category => (
                                    <option key={category.id} value={category.id} >{category.name}</option>
                                ))}
                            </select>
                            <label htmlFor="">Tipo Producto</label>
                            <select name="" id="" value={activeProduct?.productType}>
                                <option value="">TipoProducto</option>
                                <option value="calzado">{ProductType.calzado}</option>
                                <option value="indumentaria">{ProductType.indumentaria}</option>
                            </select>

                        </div>
                    </div>
                    <div className={styles.containerHandleButtons}>
                        <button type='button' onClick={() => openAdminSubSize(2)}>Manejo de Talles</button>
                        <button>Manejo de Precios</button>
                        <button>Manejo de Colores</button>
                    </div>
                    <div className={styles.containerDescription}>
                        <label htmlFor="">Descripcion</label>
                        <textarea name="" id="" placeholder='Descripcion' value={activeProduct?.description}></textarea>
                    </div>
                    <div className={styles.containerImage}>
                        <label htmlFor="">Imagen</label>
                        <input type="text" name="" id="" />
                    </div>
                    <div className={styles.containerButtons}>
                        <button onClick={closeModalAdminProduct}>Cancelar</button>
                        <button type='submit'>Aceptar</button>
                    </div>
                </form>
                {modalAdminSubSize.type && <div className={styles.modalBackdrop}><SubAdminSize/></div>}
            </div>
        )
    }
}