import { Footer } from '../../ui/footer/Footer'
import { ProfileDetails } from '../../ui/ProfileDetails/ProfileDetails'
import { ProfileHeader } from '../../ui/Headers/ProfileHeader/ProfileHeader'
import styles from './ScreenProfile.module.css'
import { EditLoginDataModal } from '../../ui/Modals/EditLoginDataModal/EditLoginDataModal'
import { useStoreModal } from '../../../store/useStoreModal'
import { ModalEditUserAdress } from '../../ui/Modals/ModalEditUserAddress/ModalEditUserAdress'



export const ScreenProfile = () => {

    const {modalEditLogin, modalEditAddress} = useStoreModal()

    return (
        <div className={styles.containerPrincipal}>
            <ProfileHeader/>
            <ProfileDetails/>
            {modalEditLogin.type && <div className={styles.modalBackdrop}><EditLoginDataModal/></div>}
            {modalEditAddress && <div className={styles.modalBackdrop}><ModalEditUserAdress/></div>}
            <Footer/>

        </div>
    )

}