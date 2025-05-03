
import { useStoreModal } from "../../../store/useStoreModal"
import { useEffect } from "react"
import { Footer } from "../../ui/footer/Footer"
import { Header } from "../../ui/Header/Header"
import HeroCarousel from "../../ui/HeroCarousel/HeroCarousel"
import { AccountModal } from "../../ui/Modals/AccountRegisterModal/AccountModal"
import style from './MainScreen.module.css'
import { getAllProducts } from "../../../cruds/crudProduct"
export const MainScreen = () => {

  const {modalAccount} = useStoreModal()


  //para ver si funciona el crud product
  useEffect(() => {
    const provisionaryGetProducts = async () => {
      const products = await getAllProducts()
      console.log(products)
    }
    provisionaryGetProducts()
  }, [])

  return (
    <>
      <div className={style.screen}>

        <Header/>
        <div>
          {modalAccount && <AccountModal/>}
        </div>
        <HeroCarousel/>
    
        <Footer/>
        
      </div>
    </>
  )
}
