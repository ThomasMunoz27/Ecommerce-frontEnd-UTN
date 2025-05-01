
import { Footer } from "../../ui/footer/Footer"
import { Header } from "../../ui/Header/Header"
import HeroCarousel from "../../ui/HeroCarousel/HeroCarousel"
import style from './MainScreen.module.css'
export const MainScreen = () => {
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
