import { useStoreDataFooter } from '../../../store/useStoreDataFooter'
import { Footer } from '../../ui/footer/Footer'
import { AboutUs } from '../../ui/FooterComponents/AboutUs/AboutUs'
import { PrivacyPolicy } from '../../ui/FooterComponents/PrivacyPolicy/PrivacyPolicy'
import { PromotionTerms } from '../../ui/FooterComponents/PromotionTerms/PromotionTerms'
import { TermsAndConditions } from '../../ui/FooterComponents/TermsAndConditions/TermsAndConditions'
import { Header } from '../../ui/Headers/Header/Header'
import style from './ScreenFooterData.module.css'

export const ScreenFooterData = () => {

    const {activeOption} = useStoreDataFooter()

    return (
        <div className={style.containerPrincipal}>
            <div>

                <Header/>
            </div>
            {activeOption === 'aboutUs' && <AboutUs/>}
            {activeOption === 'terms&Conditions' && <TermsAndConditions/>}
            {activeOption === 'terms&ConditionsPromo' && <PromotionTerms/>}
            {activeOption === 'privacyPolicy' && <PrivacyPolicy/>}
            <div style={{"height": "100%"}}>
                <Footer/>
            </div>
        </div>
    )
}