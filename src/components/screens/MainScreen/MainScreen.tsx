
import { useStoreModal } from "../../../store/useStoreModal"
import { Footer } from "../../ui/footer/Footer"
import { Header } from "../../ui/Header/Header"
import HeroCarousel from "../../ui/HeroCarousel/HeroCarousel"
import { AccountModal } from "../../ui/Modals/AccountRegisterModal/AccountModal"
import style from './MainScreen.module.css'
export const MainScreen = () => {

  const {modalAccount} = useStoreModal()

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
