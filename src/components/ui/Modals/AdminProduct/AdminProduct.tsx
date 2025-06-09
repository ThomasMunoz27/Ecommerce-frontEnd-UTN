import React, { useEffect, useState } from 'react'
import { useStoreModal } from '../../../../store/useStoreModal'
import styles from './AdminProduct.module.css'

import { ProductType } from '../../../../types/enums/ProductType'
import { SubAdminSize } from '../SubAdminSizes/SubAdminSizes'
import useStoreProduct from '../../../../store/useStoreProduct'
import { SubAdminColor } from '../SubAdminColor/SubAdminColor'
import { SubAdminPrice } from '../SubAdminPrices/SubAdminPrices'
import { SubAdminCategory } from '../SubAdminCategory/SubAdminCategory'
import { errorAlert } from '../../../../utils/errorAlert'
import { postProduct, putProduct } from '../../../../cruds/crudProduct'
import { succesAlert } from '../../../../utils/succesAlert'

import { IProduct } from '../../../../types/IProduct'
import { IImage } from '../../../../types/IImage'
import { getAllImages } from '../../../../cruds/crudImage'

import { mapProductToPayload } from '../../../../utils/mapProductToPayload'
import { checkProductAtributes } from '../../../../utils/checkProductAtributes'
import { formProductSchema } from '../../../../yupSchemas/formProductSchema'
import { checkImageUsed } from '../../../../utils/checkImageUsed'


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
    const {activeProduct, fetchProduct, setActiveProduct} = useStoreProduct()
    const [images, setImages] = useState<IImage[]>([])
    const [editProduct, setEditProduct] = useState<IProduct>()
    const [formErrors, setFormErrors] =useState<Record<string, string>>({})



    const [newProduct, setNewProduct] = useState<IProduct>({
        name: "",
        description: "",
        productType: ProductType.calzado, // reemplazar por uno válido del enum
        sex: "",
        prices: {
            id : 0,
            purchasePrice: 0,
            salePrice: 0,
            discount: null,
        },
        image: {id : 0, url : ''},    
        category: [],
        sizes: [],
        colors: [],
        stock: 0,
        active: true,

    })

    useEffect(() => {
        const getImages = async() => {
            const imageFetched = await getAllImages()
            setImages(imageFetched)
        }
        getImages()
    },[])

    useEffect(() => {
        if (modalAdminProduct.option === 2 && activeProduct) {
            setEditProduct(activeProduct);
        }
    }, [modalAdminProduct.option, activeProduct]);

    // Manejo cambios de los inputs para el edit
    const handleChangeEdit = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const {name,value} = e.target
        
        if (name === 'image') {
            const selectedImage = images.find(img => img.id === Number(value))
            if(selectedImage){
                setEditProduct(prev =>({
                    ...prev!,
                    image : selectedImage
                }))
            }
            return
        }

        setEditProduct(prev => ({
            ...prev!,
            [name] : Number(value) ? Number(value) : value
        }))
        console.log(editProduct);
        
    }


    // Manejo cambios de los inputs para el create
    const handleChangeCreate = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target

        if (name === "image") {
            const selectedImage = images.find(img => img.id === Number(value));
            if (selectedImage) {
                setNewProduct(prev => ({
                    ...prev,
                    image: selectedImage,
                }));
            }
        return; 
    }

        setNewProduct(prev => ({
            ...prev,
            [name]: name === "stock" || name === "productType" || name === "image"
            ? Number(value)
            : value
        }))

        console.log(newProduct);
        
    }

    

    // Funcion para agregar un producto nuevo
    const handleAddProduct = async (e : React.FormEvent) => {
        e.preventDefault()
        try {
            await formProductSchema.validate(newProduct, {abortEarly: false})

            const validated = checkProductAtributes(newProduct)
            if(!validated){
                return
            }

            //hay que revisar esta funcion con el Mauro
            if (newProduct.image?.id && await checkImageUsed(newProduct.image.id)) {
	            errorAlert("⚠️ La imagen ya está asignada a otro producto. Por favor, selecciona una nueva imagen.");
                return;
            }
            const productToSend = mapProductToPayload(newProduct) // Funcion para cambiar el objeto asi lo recibe el backend
            console.log(productToSend);
            
            
            await postProduct(productToSend)

            succesAlert('Creado', 'El producto se creo exitosamente')
            await fetchProduct('alls')
            
            closeModalAdminProduct()
        } catch (error : any) {
            
            const errors: Record<string, string> = {}
                if(error.inner){
                    error.inner.forEach((validationError:any) =>{
                        errors[validationError.path] = validationError.message;
                    });
                }else{
                    error.general = error.message
                }
                setFormErrors(errors)
        }
    }


    // Funcion para editar un producto activo
    const handleEditProduct = async(e : React.FormEvent) => {
        
        e.preventDefault()
        if (!editProduct || !activeProduct){
            errorAlert('Error', 'No hay producto activo')
            return
        }

        try {
            console.log("ando lol")
            const r1 =  formProductSchema.validate(editProduct, {abortEarly: false})
            
            console.log(r1)

            const validated = checkProductAtributes(editProduct)
            if(validated == false){
                return
            }
                       //hay que revisar esta funcion con el Mauro

            if (editProduct.image?.id && await checkImageUsed(editProduct.image.id)) {
	            errorAlert("⚠️ La imagen ya está asignada a otro producto. Por favor, selecciona una nueva imagen.");
	            return;
            }

            await putProduct(editProduct)
            succesAlert('Editado', 'El producto se edito correctamente')
            
            await fetchProduct('alls')

            const updated = useStoreProduct.getState().products.find(p => p.id === editProduct.id) // Busco el producto actualizado
            if(updated){
                setActiveProduct(updated) // Esto para actualizar el estado
            }
            closeModalAdminProduct()
        } catch (error : any) {
            const errors: Record<string, string> = {}
                if(error.inner){
                    error.inner.forEach((validationError:any) =>{
                        errors[validationError.path] = validationError.message;
                    });
                }else{
                    error.general = error.message
                }
                setFormErrors(errors) 
        }

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
                            <div>
                                <input type="text" name="name" id="" placeholder='Nombre' onChange={handleChangeCreate}/>
                                {formErrors.name && <p className={styles.errorMessage}>{formErrors.name}</p>}
                            </div>
                            <label htmlFor="">Stock</label>
                            <div>
                                <input type="number" name="stock" id="" placeholder='Stock' onChange={handleChangeCreate}/>
                                {formErrors.stock && <p className={styles.errorMessage}>{formErrors.stock}</p>}

                            </div>

                        </div>
                        <div className={styles.containerColumn}>

                            {/* Sexo */}
                            <label htmlFor="">Sexo</label>
                            <div>
                            <select name="sex" id="" onChange={handleChangeCreate}>
                                <option value="" disabled selected>Sin Seleccion</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                                <option value="Unisex">Unisex</option>
                            </select>
                            {formErrors.sex && <p className={styles.errorMessage}>{formErrors.sex}</p>}
                            </div>


                            {/* Tipo Producto */}
                            <label htmlFor="">Tipo Producto</label>
                            <select name="productType" id="" onChange={handleChangeCreate}>
                                <option value="" disabled selected>Sin Seleccion</option>
                                <option value='0'>{ProductType.calzado}</option>
                                <option value='1'>{ProductType.indumentaria}</option>
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
                            {formErrors.description && <p className={styles.errorMessage}>{formErrors.description}</p>}

                        
                    </div>

                    {/* Imagen */}
                    <div className={styles.containerImage}>
                        <label htmlFor="">Imagen</label>
                        <select name="image" id="" onChange={handleChangeCreate}>
                            <option value="" disabled >Sin seleccion</option>
                            {images.map(image => (
                                <option value={image.id}>{image.id}</option>
                            ))}
                        </select>
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
                            <input type="text" name="name" id="" placeholder='Nombre' value={editProduct?.name} onChange={handleChangeEdit}/>
                            <label htmlFor="">Stock</label>
                            <input type="number" name="stock" id="" placeholder='Stock' value={editProduct?.stock} onChange={handleChangeEdit}/>

                        </div>
                        <div className={styles.containerColumn}>

                            <label htmlFor="">Sexo</label>
                            <input type="text" name="sex" id="" placeholder='sexo' value={editProduct?.sex} onChange={handleChangeEdit}/>

                            <label htmlFor="">Tipo Producto</label>
                            <select name="productType" id="" value={editProduct?.productType} onChange={handleChangeEdit}>
                                <option value="" disabled selected>Sin seleccion</option>
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
                        <textarea name="description" id="" placeholder='Descripcion' value={editProduct?.description} onChange={handleChangeEdit}></textarea>
                    </div>
                    <div className={styles.containerImage}>
                        <label htmlFor="">Imagen</label>
                        <select name="image" id="" value={editProduct?.image?.id} onChange={handleChangeEdit}>
                            <option value="" disabled >Sin seleccion</option>
                            {images.map(image => (
                                <option value={image.id}>{image.id}</option>
                            ))}
                        </select>
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