import styles from './AdminScreen.module.css'
import { HeaderAdmin } from '../../ui/Headers/HeaderAdmin/HeaderAdmin'
import { useStoreAdmin } from '../../../store/useStoreAdmin'
import { Footer } from '../../ui/footer/Footer'
import { ProductsAdmin } from '../../ui/ProductsAdmin/ProductsAdmin'
import { UsersAdmin } from '../../ui/UsersAdmin/UsersAdmin'

export const AdminScreen = () => {

    const {activeOption} = useStoreAdmin()

    return(
        <div className={styles.containerPrincipal}>
            <HeaderAdmin/>
            {activeOption === 'product' && <ProductsAdmin/>}
            {activeOption === 'users' && <UsersAdmin/>}
            {activeOption === '' &&
             <div className={styles.containerAdmin}>
                <h1>ADMIN</h1>
             </div>
             }
            <Footer/>
        </div>
    )
}