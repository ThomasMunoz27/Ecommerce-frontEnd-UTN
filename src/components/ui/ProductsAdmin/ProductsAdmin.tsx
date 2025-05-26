import { useEffect, useState } from 'react';
import styles from './ProductsAdmin.module.css';
import { deleteProduct, getAllProducts } from '../../../cruds/crudProduct';
import { IProduct } from '../../../types/IProduct';
import { useStoreModal } from '../../../store/useStoreModal';
import useStoreProduct from '../../../store/useStoreProduct';
import { AdminAddProductModal } from '../Modals/AdminAddProductModal/AdminAddProductModal';
import { AdminEditProductModal } from '../Modals/AdminEditProductModal/AdminEditProductModal';


export const ProductsAdmin = () => {
    const {setActiveProduct} = useStoreProduct()
    const [products, setProducts] = useState<IProduct[]>();
    const {openModalEditAdminProduct, modalEditAdminProduct, openModalAddAdminProduct, modalAddAdminProduct} = useStoreModal()

    useEffect(() => {
        const getProducts = async () => {
        const products = await getAllProducts();
            console.log(products);
            setProducts(products);
        };
    getProducts();
    }, []);

    // Pongo el producto a editar como producto activo
    const handleEdit = (product : IProduct) => {
        openModalEditAdminProduct()
        setActiveProduct(product)
    }

    const handleDelete = async(idProduct : number) => {
        await deleteProduct(idProduct)
    }

    return (
        <div className={styles.containerPrincipal}>
            <div className={styles.containerTitleAndButton}>
                <div className={styles.containerTitle}>
                    <h1>Gestión de Productos</h1>
                </div>
                <div className={styles.containerButtons}>
                    <button onClick={openModalAddAdminProduct}>
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
                                <button onClick={() => handleDelete(product.id)}>Eliminar</button>
                            </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {modalEditAdminProduct && <div className={styles.modalBackdrop}><AdminEditProductModal/></div>}
        {modalAddAdminProduct && <div className={styles.modalBackdrop}><AdminAddProductModal/></div>}
    </div>
    );
};
