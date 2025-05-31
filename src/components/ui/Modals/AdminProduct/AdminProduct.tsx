import React, { useState } from 'react'
import { useStoreModal } from '../../../../store/useStoreModal'
import styles from './AdminProduct.module.css'

import { ProductType } from '../../../../types/enums/ProductType'
import { ICreateProduct } from '../../../../types/ICreateProduct'
import { SubAdminSize } from '../SubAdminSizes/SubAdminSizes'
import useStoreProduct from '../../../../store/useStoreProduct'
import { SubAdminColor } from '../SubAdminColor/SubAdminColor'
import { SubAdminPrice } from '../SubAdminPrices/SubAdminPrices'
import { SubAdminCategory } from '../SubAdminCategory/SubAdminCategory'


export const AdminProduct = () => {
    const {
        modalAdminProduct, 
        closeModalAdminProduct,
        modalAdminSubSize, 
        openAdminSubSize, 
        modalAdminSubColor, 
        openAdminSubColor, 
        modalAdminSubPrice, 
        openAdminSubPrice,
        modalAdminSubCategory,
        openAdminSubCategory

    } = useStoreModal()
    const {activeProduct} = useStoreProduct()
    const [newProduct, setNewProduct] = useState<ICreateProduct>({
        name : '',
        description : '',
        productTypeId : 0,
        sex : '',
        pricesId : 0,
        imageId : 0,
        categoryId : [],
        sizes: [],
        colors : [],
        stock : 0,
        active: true

    })

    // Manejo cambios de los inputs para el edit
    const handleChangeEdit = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const {name,value} = e.target
        console.log(name, value);
        
    }


    // Manejo cambios de los inputs para el create
    const handleChangeCreate = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target
        console.log(name, value);
        
    }

    // Funcion para agregar un producto nuevo
    const handleAddProduct = (e : React.FormEvent) => {
        e.preventDefault()
    }


    // Funcion para editar un producto activo
    const handleEditProduct = (e : React.FormEvent) => {
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

                            {/* Nombre, stock del producto  */}

                            <label htmlFor="">Nombre</label>
                            <input type="text" name="name" id="" placeholder='Nombre' onChange={handleChangeCreate}/>
                            <label htmlFor="">Stock</label>
                            <input type="number" name="" id="" placeholder='Stock' onChange={handleChangeCreate}/>

                        </div>
                        <div className={styles.containerColumn}>

                            {/* Sexo */}
                            <label htmlFor="">Sexo</label>
                            <input type="text" name="" id="" placeholder='sexo' onChange={handleChangeCreate}/>


                            {/* Tipo Producto */}
                            <label htmlFor="">Tipo Producto</label>
                            <select name="productType" id="" onChange={handleChangeCreate}>
                                <option value="">TipoProducto</option>
                                <option value="calzado">{ProductType.calzado}</option>
                                <option value="indumentaria">{ProductType.indumentaria}</option>
                            </select>

                        </div>
                    </div>


                    {/* Botones para el manejo de categorias (proximamente), talles, precios y colores */}
                    <div className={styles.containerHandleButtons}>
                        <button type='button' onClick={() => openAdminSubSize(1)}>Manejo de Talles</button>
                        <button type='button' onClick={() => openAdminSubPrice(1)}> Manejo de Precios</button>
                        <button type='button' onClick={() => openAdminSubColor(1)}>Manejo de Colores</button>
                        <button type='button' onClick={() => openAdminSubCategory(1)}>Manejo de Categorias</button>
                    </div>

                    {/* Descripcion */}
                    <div className={styles.containerDescription}>
                        <label htmlFor="">Descripcion</label>
                        <textarea name="description" id="" placeholder='Descripcion' onChange={handleChangeCreate}></textarea>
                    </div>

                    {/* Imagen */}
                    <div className={styles.containerImage}>
                        <label htmlFor="">Imagen</label>
                        <input type="text" name="image.url" id="" onChange={handleChangeCreate}/>
                    </div>

                    <div className={styles.containerButtons}>
                        <button onClick={closeModalAdminProduct}>Cancelar</button>
                        <button type='submit'>Aceptar</button>
                    </div>
                </form>

                {/* Submodals */}
                {modalAdminSubSize.type && <div className={styles.modalBackdrop}><SubAdminSize product={newProduct}/></div>}
                {modalAdminSubColor.type && <div className={styles.modalBackdrop}><SubAdminColor product={newProduct}/></div>}
                {modalAdminSubPrice.type && <div className={styles.modalBackdrop}><SubAdminPrice product={newProduct} setProduct={setNewProduct}/></div>}
                {modalAdminSubCategory.type && <div className={styles.modalBackdrop}><SubAdminCategory product={newProduct}/></div>}
            </div>
        )
    }else if(modalAdminProduct.option === 2){


        // Editar Producto

        return(
            <div className={styles.containerPrincipal}>
                <div className={styles.containerTitle}>
                    <h1>Editar Producto</h1>
                </div>
                <form action="" onSubmit={handleEditProduct}>
                    <div className={styles.containerData}>
                        <div className={styles.containerColumn}>
                            <label htmlFor="">Nombre</label>
                            <input type="text" name="name" id="" placeholder='Nombre' value={activeProduct?.name} onChange={handleChangeEdit}/>
                            <label htmlFor="">Stock</label>
                            <input type="number" name="stock" id="" placeholder='Stock' value={activeProduct?.stock} onChange={handleChangeEdit}/>

                        </div>
                        <div className={styles.containerColumn}>

                            <label htmlFor="">Sexo</label>
                            <input type="text" name="sex" id="" placeholder='sexo' value={activeProduct?.sex} onChange={handleChangeEdit}/>
                            <label htmlFor="">Tipo Producto</label>
                            <select name="productType" id="" value={activeProduct?.productType}>
                                <option value="">TipoProducto</option>
                                <option value="calzado">{ProductType.calzado}</option>
                                <option value="indumentaria">{ProductType.indumentaria}</option>
                            </select>

                        </div>
                    </div>
                    <div className={styles.containerHandleButtons}>
                        <button type='button' onClick={() => openAdminSubSize(2)}>Manejo de Talles</button>
                        <button type='button' onClick={() => openAdminSubPrice(2)}>Manejo de Precios</button>
                        <button type='button' onClick={() => openAdminSubColor(2)}>Manejo de Colores</button>
                        <button type='button' onClick={() => openAdminSubCategory(2)}>Manejo de Categorias</button>
                    </div>
                    <div className={styles.containerDescription}>
                        <label htmlFor="">Descripcion</label>
                        <textarea name="description" id="" placeholder='Descripcion' value={activeProduct?.description}></textarea>
                    </div>
                    <div className={styles.containerImage}>
                        <label htmlFor="">Imagen</label>
                        <input type="text" name="image.url" id="" />
                    </div>
                    <div className={styles.containerButtons}>
                        <button onClick={closeModalAdminProduct}>Cancelar</button>
                        <button type='submit'>Aceptar</button>
                    </div>
                </form>

                {/* Submodals */}
                {modalAdminSubSize.type && <div className={styles.modalBackdrop}><SubAdminSize/></div>}
                {modalAdminSubColor.type && <div className={styles.modalBackdrop}><SubAdminColor/></div>}
                {modalAdminSubPrice.type && <div className={styles.modalBackdrop}><SubAdminPrice/></div>}
                {modalAdminSubCategory.type && <div className={styles.modalBackdrop}><SubAdminCategory/></div>}
            </div>
        )
    }
}