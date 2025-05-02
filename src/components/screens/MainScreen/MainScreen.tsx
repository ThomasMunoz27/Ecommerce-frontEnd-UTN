
import { useEffect } from "react"
import { Footer } from "../../ui/footer/Footer"
import { Header } from "../../ui/Header/Header"
import HeroCarousel from "../../ui/HeroCarousel/HeroCarousel"
import style from './MainScreen.module.css'
import { getAllProucts } from "../../../cruds/crudProduct"
export const MainScreen = () => {

  //para ver si funciona el crud product
  useEffect(() => {
    const provisionaryGetProducts = async () => {
      const products = await getAllProucts()
      console.log("trayendo productos" + products)
    }
    provisionaryGetProducts()
  }, [])

  return (
    <>
      <div className={style.screen}>

        <Header/>
    
        <HeroCarousel/>
    
        <Footer/>
        
      </div>
    </>
  )
}
