import { useEffect, useState } from 'react';
import styles from './ProductsAdmin.module.css';
import { deleteProduct, getAllProducts } from '../../../cruds/crudProduct';
import { IProduct } from '../../../types/IProduct';
import { useStoreModal } from '../../../store/useStoreModal';
import { AdminProductModal } from '../Modals/AdminAddProductModal/AdminProductModal';
import useStoreProduct from '../../../store/useStoreProduct';


export const ProductsAdmin = () => {
    const {setActiveProduct} = useStoreProduct()
    const [products, setProducts] = useState<IProduct[]>();
    const {openModalAdminProduct, modalAdminProduct} = useStoreModal()

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
        openModalAdminProduct()
        setActiveProduct(product)
    }

    const handleDelete = async(idProduct : number) => {
        await deleteProduct(idProduct)
    }

    return (
        <div className={styles.containerPrincipal}>
        <div className={styles.containerTitle}>
            <h1>Gestión de Productos</h1>
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
                                    <option value="" style={{'backgroundColor' : `${color.value}`}}></option>
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
        {modalAdminProduct && <div className={styles.modalBackdrop}><AdminProductModal/></div>}
    </div>
    );
};
