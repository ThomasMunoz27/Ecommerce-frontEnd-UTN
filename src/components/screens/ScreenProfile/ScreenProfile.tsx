import { Footer } from '../../ui/footer/Footer'
import { ProfileDetails } from '../../ui/ProfileDetails/ProfileDetails'
import { ProfileHeader } from '../../ui/Headers/ProfileHeader/ProfileHeader'
import styles from './ScreenProfile.module.css'


export const ScreenProfile = () => {

    return (
        <div className={styles.containerPrincipal}>
            <ProfileHeader/>
            <ProfileDetails/>
            <Footer/>

        </div>
    )

}