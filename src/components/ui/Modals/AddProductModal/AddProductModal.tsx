
import { useState } from 'react'
import { useStoreCart } from '../../../../store/useStoreCart'
import { useStoreModal } from '../../../../store/useStoreModal'
import useStoreProduct from '../../../../store/useStoreProduct'
import styles from './AddProductModal.module.css'

export const AddProductModal = () => {

    const {activeProduct} = useStoreProduct() // Llamo al producto activo para mostrar sus datos
    const {closeModalAddProduct} = useStoreModal()
    const {addProductToCart} = useStoreCart()
    const [selectedSizeId, setSelectedSizeId] = useState<number | null>(null)
    const [selectedSize, setSelectedSize] = useState(true)

    // Mandar el producto al carrito
    const handleAddProductToCart = () => {
        if(selectedSizeId){
            const selectedSize = activeProduct?.sizes.find(size => size.id === selectedSizeId)
            const productWithSize = {
                ...activeProduct!,
                selectedSize
            }
            addProductToCart(productWithSize)
            closeModalAddProduct()
        }else{
            setSelectedSize(false)
        }
    }

    // Cambiar el estilo
    const handleClickSize = (sizeId : number) => {
        setSelectedSizeId(sizeId)
        setSelectedSize(true)
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
                <h1>Talles</h1>
            <div className={styles.constainerSizes}>
                {activeProduct?.sizes.map(size => (
                    <div key={size.id} className={selectedSizeId === size.id ? styles.sizeCardSelected : styles.sizeCard} onClick={() => handleClickSize(size.id)}>
                        {size.size}
                    </div>
                    ))}
            </div>
            <div className={styles.sizeNotSelected}>
                {selectedSize === false ? <p>Debe seleccionar un talle</p> : null}
            </div>
            <div className={styles.containerButtons}>
                <button onClick={closeModalAddProduct}>Cancelar</button>
                <button onClick={handleAddProductToCart}>Aceptar</button>
            </div>
        </div>
    )
}