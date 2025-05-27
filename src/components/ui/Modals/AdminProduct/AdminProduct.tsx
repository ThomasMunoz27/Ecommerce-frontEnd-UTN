import { useStoreModal } from '../../../../store/useStoreModal'
import styles from './AdminProduct.module.css'

export const AdminProduct = () => {
    const {modalAdminProduct, closeModalAdminProduct} = useStoreModal()
    if (modalAdminProduct.option === 1){
        return(
            <div className={styles.containerPrincipal}>
                <div className={styles.containerTitle}>
                    <h1>Crear Producto</h1>
                </div>
                <form action="">
                    <div className={styles.containerData}>
                        <div className={styles.containerColumn}>
                            <label htmlFor="">Nombre</label>
                            <input type="text" name="name" id="" placeholder='Nombre'/>
                            <label htmlFor="">Stock</label>
                            <input type="number" name="" id="" placeholder='Stock'/>
                            <label htmlFor="">Sexo</label>
                            <input type="text" name="" id="" placeholder='sexo'/>

                        </div>
                        <div className={styles.containerColumn}>

                            <label htmlFor="">Categoria</label>
                            <select name="" id="">
                                <option value="" selected disabled>Categorias</option>
                            </select>
                            <label htmlFor="">Tipo Producto</label>
                            <select name="" id="">
                                <option value="">TipoProducto</option>
                            </select>

                        </div>
                    </div>
                    <div className={styles.containerHandleButtons}>
                        <button>Manejo de Talles</button>
                        <button>Manejo de Precios</button>
                        <button>Manejo de Colores</button>
                    </div>
                    <div className={styles.containerDescription}>
                        <label htmlFor="">Descripcion</label>
                        <textarea name="" id="" placeholder='Descripcion'></textarea>
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
            </div>
        )
    }else if(modalAdminProduct.option === 2){


        return(
            <div className={styles.containerPrincipal}>
                <div className={styles.containerTitle}>
                    <h1>Editar Producto</h1>
                </div>
                <form action="">
                    <div className={styles.containerData}>
                        <div className={styles.containerColumn}>
                            <label htmlFor="">Nombre</label>
                            <input type="text" name="name" id="" placeholder='Nombre'/>
                            <label htmlFor="">Stock</label>
                            <input type="number" name="" id="" placeholder='Stock'/>
                            <label htmlFor="">Sexo</label>
                            <input type="text" name="" id="" placeholder='sexo'/>

                        </div>
                        <div className={styles.containerColumn}>

                            <label htmlFor="">Categoria</label>
                            <select name="" id="">
                                <option value="" selected disabled>Categorias</option>
                            </select>
                            <label htmlFor="">Tipo Producto</label>
                            <select name="" id="">
                                <option value="">TipoProducto</option>
                            </select>

                        </div>
                    </div>
                    <div className={styles.containerHandleButtons}>
                        <button>Manejo de Talles</button>
                        <button>Manejo de Precios</button>
                        <button>Manejo de Colores</button>
                    </div>
                    <div className={styles.containerDescription}>
                        <label htmlFor="">Descripcion</label>
                        <textarea name="" id="" placeholder='Descripcion'></textarea>
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
            </div>
        )
    }
}