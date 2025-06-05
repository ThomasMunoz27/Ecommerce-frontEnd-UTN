import { useEffect, useState } from 'react';
import styles from './ProductsAdmin.module.css';
import { deleteProduct } from '../../../../cruds/crudProduct';
import { IProduct } from '../../../../types/IProduct';
import { useStoreModal } from '../../../../store/useStoreModal';
import useStoreProduct from '../../../../store/useStoreProduct';


import { AdminProduct } from '../../Modals/AdminProduct/AdminProduct';
import { errorAlert } from '../../../../utils/errorAlert';
import { succesAlert } from '../../../../utils/succesAlert';


export const ProductsAdmin = () => {
    const {setActiveProduct, fetchProduct, products} = useStoreProduct()
    
    const {modalAdminProduct, openModalAdminProduct} = useStoreModal()
    const [active, setActive] = useState<string>('active')
    
    
    useEffect(() => {
        fetchProduct(active)  
    },[active])

    const handleEdit = (product : IProduct) => {
        openModalAdminProduct(2)
        setActiveProduct(product)
    }

    const handleActive = (state : string) => {
        setActive(state)
        
    }

    const handleDelete = async(idProduct : number) => {
        try {
            const deletedProduct = await deleteProduct(idProduct)
            if (!deletedProduct) {
                errorAlert('Error', 'No se pudo eliminar el producto')
            }
            succesAlert('Eliminado', 'Se elimino el producto exitosamente')
            fetchProduct(active)
        } catch (error : any) {
            errorAlert('Error', 'No se pudo eliminar el producto')
            console.log(error.message);
            
        }
    }



    return (
        <div className={styles.containerPrincipal}>
            <div className={styles.containerTitleAndButton}>
                <div className={styles.containerTitle}>
                    <h1>Gestión de Productos</h1>
                </div>
                <div className={styles.containerButtons}>
                    <button onClick={() => handleActive('active')}>
                        Activos
                    </button>
                    <button onClick={() => handleActive('inactive')}>
                        Inactivos
                    </button>
                    <button onClick={() => handleActive('alls')}>
                        Todos
                    </button>
                    <button onClick={() => openModalAdminProduct(1)}>
                        Añadir
                    </button>
                </div>
            </div>
        <div className={styles.productsTable}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Talle</th>
                        <th>Color</th>
                        <th>Descripción</th>
                        <th>Stock</th>
                        <th>Sexo</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products?.map((product) => (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.prices.salePrice}</td>
                        <td>
                            <select>
                                <option value="">Talles</option>
                                    {product.sizes.map((size) => (
                                    <option key={size.size} value={size.size}>
                                        {size.size}
                                    </option>
                                ))}
                            </select>
                        </td>
                        <td>
                            <select >
                                <option value="">Color</option>
                                {product.colors.map((color) => (
                                    <option key={color.id} value="" style={{'backgroundColor' : `${color.value}`}}></option>
                                ))}
                            </select>
                        </td>
                        <td>{product.description || 'Sin descripción'}</td>
                        <td>{product.stock || 'N/A'}</td>
                        <td>{product.sex}</td>
                        <td>
                            <div className={styles.actionButtons}>
                                <button onClick={() => handleEdit(product)}>Editar</button>
                                <button onClick={() => handleDelete(Number(product.id))}>Eliminar</button>
                            </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {modalAdminProduct.type && <div className={styles.modalBackdrop}><AdminProduct/></div>}
    </div>
    );
};
