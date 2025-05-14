
import { useState } from 'react'
import { useStoreCart } from '../../../../store/useStoreCart'
import { useStoreModal } from '../../../../store/useStoreModal'
import useStoreProduct from '../../../../store/useStoreProduct'
import styles from './AddProductModal.module.css'
import { ICartProduct } from '../../../../types/ICartProduct'
import { getColorStyle } from '../../../../utils/getColorStyle'

export const AddProductModal = () => {

    const {activeProduct} = useStoreProduct() // Llamo al producto activo para mostrar sus datos
    const {closeModalAddProduct} = useStoreModal()
    const {addProductToCart} = useStoreCart()
    const [selectedSizeId, setSelectedSizeId] = useState<number | null>(null) // Estado para seleccionar el id del talle
    const [selectedColorId, setSelectedColorId] = useState<number | null>(null)
    const [selectedColor, setSelectedColor] = useState(true)
    const [selectedSize, setSelectedSize] = useState(true) // Estado para ver si hay talle seleccionado

    // Funcion para ver los colores 
    
        
    // Mandar el producto al carrito
    const handleAddProductToCart = () => {
        const sizeSelected = activeProduct?.sizes.find(size => size.id === selectedSizeId)
        const colorSelected = activeProduct?.colors.find(color => color.id === selectedColorId)

        if (!sizeSelected) setSelectedSize(false)
        if (!colorSelected) setSelectedColor(false)

        if (!activeProduct || !sizeSelected || !colorSelected) return

        const productWithSizeAndColor: ICartProduct = {
            ...activeProduct,
            quantity: 1,
            size: sizeSelected,
            color: colorSelected
        }

        addProductToCart(productWithSizeAndColor)
        closeModalAddProduct()
    }


    // Cambiar el estilo talle
    const handleClickSize = async (sizeId : number) => {
        await setSelectedSizeId(sizeId)
        await setSelectedSize(true)
    }

    //Cambiar estilo color
    const handleClickColor = async (colorId : number) => {
        await setSelectedColorId(colorId)
        await setSelectedColor(true)
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

            <div className={styles.objectNotSelected}>
                {selectedSize === false ? <p>Debe seleccionar un talle</p> : null}
            </div>

            <div className={styles.containerColors}>
                {activeProduct?.colors && activeProduct!.colors.length > 0 ? (
                    activeProduct?.colors.map(color => (
                        <div key={color.id}
                        className={selectedColorId === color.id ? styles.colorSelected : styles.colors}
                        style={getColorStyle(color.value)}
                        onClick={() => handleClickColor(color.id)}>
                            
                        </div>
                    ))
                ) : (
                    <div>
                        <p>No hay colores disponibles</p>
                    </div>
                )}
            </div>

            <div className={styles.objectNotSelected}>
                {!selectedColor ? <p>Debe seleccionar un color</p> : null}
            </div>
            <div className={styles.containerButtons}>
                <button onClick={closeModalAddProduct}>Cancelar</button>
                <button disabled={selectedSize === null} onClick={handleAddProductToCart}>Aceptar</button>
            </div>
        </div>
    )
}
