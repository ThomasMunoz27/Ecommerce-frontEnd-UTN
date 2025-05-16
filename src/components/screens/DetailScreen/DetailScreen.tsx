import { useState } from "react";
import useStoreProduct from "../../../store/useStoreProduct";
import { getColorStyle } from "../../../utils/getColorStyle";
import { Footer } from "../../ui/footer/Footer";
import { Header } from "../../ui/Headers/Header/Header";
import style from "./DetailScreen.module.css"
import { useStoreModal } from "../../../store/useStoreModal";
import { useStoreCart } from "../../../store/useStoreCart";
import { ICartProduct } from "../../../types/ICartProduct";
export const DetailScreen = () => {

    // Stores 

     const {closeModalAddProduct} = useStoreModal()
    
     const {addProductToCart} = useStoreCart()

     const {activeProduct} = useStoreProduct()

       // Mandar el producto al carrito

        const handleAddProductToCart = () => {
            const sizeSelected = activeProduct?.sizes.find(size => size.id === selectedSizeId)
            const colorSelected = activeProduct?.colors.find(color => color.id === selectedColorId)
    
            if (!sizeSelected) setSelectedSize(false)
            if (!colorSelected) setSelectedColor(false)
    
            if (!activeProduct || !sizeSelected || !colorSelected) {
                alert('Debes seleccionar un talle y un color para agregar un producto')
                return
            }
    
            const productWithSizeAndColor: ICartProduct = {
                ...activeProduct,
                quantity: 1,
                size: sizeSelected,
                color: colorSelected
            }
    
            addProductToCart(productWithSizeAndColor)
            closeModalAddProduct()
        }

    // Color state´s

      const [selectedColorId, setSelectedColorId] = useState<number | null>(null)
    
      const [selectedColor, setSelectedColor] = useState(true)

        // Size state´s

      const [selectedSizeId, setSelectedSizeId] = useState<number | null>(null) // Estado para seleccionar el id del talle
        
      const [selectedSize, setSelectedSize] = useState(true) // Estado para ver si hay talle seleccionado

      // Click handlers

        const handleClickSize = async (sizeId : number) => {
        await setSelectedSizeId(sizeId)
        await setSelectedSize(true)
    }

         const handleClickColor = async (colorId : number) => {
        if(selectedColorId == colorId){
            setSelectedColor(false)
            setSelectedColorId(null)
        }else{
            
            await setSelectedColorId(colorId)
            await setSelectedColor(true)
        }
    }

  return (
    <>
    <Header/>
        <div className={style.hero}>
            <div className={style.imgContainer}>
                <img src={activeProduct?.image.url} alt="" className={style.productImg} />
            </div>
            <div className={style.textContainer}>
                <h1 className={style.textTitle}>{activeProduct?.name}</h1>
                <p className={style.productCategory}>{activeProduct?.category.name}</p>
                <p className={style.productPrice}>${activeProduct?.prices.salePrice}</p>

                <div className={style.sizeSection}>
                <h3>Talles:</h3>
                <div className={style.sizeContainer}>

                    {activeProduct?.sizes.map((size) => (<p className={selectedSizeId === size.id ? style.sizeCardSelected : style.sizeTag}  onClick={() => handleClickSize(size.id)}>{size.size}</p>))}
                </div>
                </div>
                
                <div className={style.colorSection}>
                    <h3>Colores:</h3>
                    <div className={style.colorsContainer}>
                        {activeProduct?.colors.map((color) => (  <div key={color.id}
                            className={selectedColorId === color.id ? style.colorSelected : style.color}
                            style={getColorStyle(color.value)}
                            onClick={() => handleClickColor(color.id)}>
                        </div>))}
                    </div>
                </div>
                
                <button className={style.buyButton} onClick={handleAddProductToCart}>Añadir al carrito</button>
            </div>
        </div>
    <Footer/>
    </>
  );
};