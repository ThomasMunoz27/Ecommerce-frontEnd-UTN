
import { useEffect, useState } from "react"
import { useStoreModal } from "../../../store/useStoreModal"

import { Footer } from "../../ui/footer/Footer"

import HeroCarousel from "../../ui/HeroCarousel/HeroCarousel"
import { ListProducts } from "../../ui/ListProducts/ListProducts"
import style from './MainScreen.module.css'
import { IProduct } from "../../../types/IProduct"
import { getAllProducts } from "../../../cruds/crudProduct"
import { Header } from "../../ui/Headers/Header/Header"
import { AddProductModal } from "../../ui/Modals/AddProductModal/AddProductModal"



export const MainScreen = () => {

  const {modalAddProduct, modalAccount} = useStoreModal()

  const [products, setProducts] = useState<IProduct[]>([])
  const {closeModalAddProduct} = useStoreModal()
    useEffect(() => {
        closeModalAddProduct()
        const fetchProducts = async () => {
            const arrayProducts = await getAllProducts()
            setProducts(arrayProducts)

        }
        fetchProducts()
    }, [])


  return (
    <>
      <div className={style.screen}>

        <Header/>
        
          
        
        <HeroCarousel/>
        <ListProducts productsArray={products} title={"Todos los productos"}/>
        {modalAddProduct && <div className={style.modalBackdrop}><AddProductModal/></div>}
        {/* {modalAccount && <div className={style.modalBackdrop}><AccountModal/></div>} */}
    
        <Footer/>
        
      </div>
    </>
  )
}
