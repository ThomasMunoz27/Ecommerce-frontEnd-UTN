import { Footer } from '../../ui/footer/Footer'
import { ProfileDetails } from '../../ui/ProfileDetails/ProfileDetails'
import { ProfileHeader } from '../../ui/Headers/ProfileHeader/ProfileHeader'
import styles from './ScreenProfile.module.css'
import { EditLoginDataModal } from '../../ui/Modals/EditLoginDataModal/EditLoginDataModal'
import { useStoreModal } from '../../../store/useStoreModal'


export const ScreenProfile = () => {

    const {modalEditLogin} = useStoreModal()

    return (
        <div className={styles.containerPrincipal}>
            <ProfileHeader/>
            <ProfileDetails/>
            {modalEditLogin.type && <div className={styles.modalBackdrop}><EditLoginDataModal/></div>}
            <Footer/>

        </div>
    )

}