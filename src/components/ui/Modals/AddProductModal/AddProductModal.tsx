
import { useStoreCart } from '../../../../store/useStoreCart'
import { useStoreModal } from '../../../../store/useStoreModal'
import useStoreProduct from '../../../../store/useStoreProduct'
import styles from './AddProductModal.module.css'

export const AddProductModal = () => {

    const {activeProduct} = useStoreProduct() // Llamo al producto activo para mostrar sus datos
    const {closeModalAddProduct} = useStoreModal()
    const {addProductToCart} = useStoreCart()

    const handleAddProductToCart = () => {
        addProductToCart(activeProduct!)
        closeModalAddProduct()
    }

    return (
        <div className={styles.containerPrincipal}>
            <h1>Agregar Producto</h1>
            <div className={styles.infoProduct}>
                <div className={styles.imageProduct}>
                    <img src={activeProduct?.image.url} alt={activeProduct?.name} />
                </div>
                <div className={styles.productDetails}>
                    <p>{activeProduct?.name}</p>
                    <p>${activeProduct?.prices.salePrice}</p>
                </div>
            </div>
            <div className={styles.constainerSizes}>
                <h1>Talles</h1>
                <p>Aca van varios talles que depende como los voy a llamar es como los renderizo</p>
            </div>
            <div className={styles.containerButtons}>
                <button onClick={closeModalAddProduct}>Cancelar</button>
                <button onClick={handleAddProductToCart}>Aceptar</button>
            </div>
        </div>
    )
}