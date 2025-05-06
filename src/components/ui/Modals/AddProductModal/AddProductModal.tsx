
import styles from './AddProductModal.module.css'

export const AddProductModal = () => {
    return (
        <div className={styles.containerPrincipal}>
            <h1>Agregar Producto</h1>
            <div className={styles.infoProduct}>
                <div className={styles.imageProduct}>
                    <p>Imagen</p>
                </div>
                <div className={styles.productDetails}>
                    <p>Nombre Product</p>
                    <p>$Precio</p>
                </div>
            </div>
            <div className={styles.constainerSizes}>
                <h1>Talles</h1>
                <p>Aca van varios talles que depende como los voy a llamar es como los renderizo</p>
            </div>
            <div className={styles.containerButtons}>
                <button>Cancelar</button>
                <button>Aceptar</button>
            </div>
        </div>
    )
}