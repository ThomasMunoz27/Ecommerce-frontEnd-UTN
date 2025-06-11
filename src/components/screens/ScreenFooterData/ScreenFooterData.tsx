import { useStoreDataFooter } from '../../../store/useStoreDataFooter'
import { Footer } from '../../ui/footer/Footer'
import { Header } from '../../ui/Headers/Header/Header'
import style from './ScreenFooterData.module.css'

export const ScreenFooterData = () => {

    const {activeOption} = useStoreDataFooter()

    return (
        <div className={style.containerPrincipal}>
            <Header/>
            {activeOption === 'aboutUs'}
            {activeOption === 'terms&Conditions'}
            {activeOption === 'terms&ConditionsPromo'}
            {activeOption === 'privacyPolicy'}
            <Footer/>
        </div>
    )
}