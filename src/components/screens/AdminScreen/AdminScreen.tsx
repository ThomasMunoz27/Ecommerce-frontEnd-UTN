import { Link } from 'react-router'
import styles from './AdminScreen.module.css'
import { Header } from '../../ui/Headers/Header/Header'
import { HeaderAdmin } from '../../ui/Headers/HeaderAdmin/HeaderAdmin'

export const AdminScreen = () => {
    return(
        <div className={styles.containerPrincipal}>
            <HeaderAdmin/>
        </div>
    )
}