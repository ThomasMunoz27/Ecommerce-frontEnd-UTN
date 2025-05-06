
import { useEffect, useState } from "react"
import { useStoreModal } from "../../../store/useStoreModal"

import { Footer } from "../../ui/footer/Footer"

import HeroCarousel from "../../ui/HeroCarousel/HeroCarousel"
import { ListProducts } from "../../ui/ListProducts/ListProducts"
import { AccountModal } from "../../ui/Modals/AccountRegisterModal/AccountModal"
import style from './MainScreen.module.css'
import { IProduct } from "../../../types/IProduct"
import { getAllProducts } from "../../../cruds/crudProduct"
import { Header } from "../../ui/Headers/Header/Header"

export const MainScreen = () => {

  const {modalAccount} = useStoreModal()

  const [products, setProducts] = useState<IProduct[]>([])

    useEffect(() => {
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
        <div>
          {modalAccount && <AccountModal/>}
        </div>
        <HeroCarousel/>
        <ListProducts productsArray={products} title={"Todos los productos"}/>
    
        <Footer/>
        
      </div>
    </>
  )
}
