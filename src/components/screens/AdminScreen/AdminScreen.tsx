import styles from './AdminScreen.module.css'
import { HeaderAdmin } from '../../ui/Headers/HeaderAdmin/HeaderAdmin'
import { useStoreAdmin } from '../../../store/useStoreAdmin'
import { Footer } from '../../ui/footer/Footer'
import { ProductsAdmin } from '../../ui/AdminComponents/ProductsAdmin/ProductsAdmin'
import { UsersAdmin } from '../../ui/AdminComponents/UsersAdmin/UsersAdmin'
import { DiscountsAdmin } from '../../ui/AdminComponents/DiscountsAdmin/DiscountsAdmin'
import { ColorsAdmin } from '../../ui/AdminComponents/ColorsAdmin/ColorsAdmin'
import { SizesAdmin } from '../../ui/AdminComponents/SizesAdmin/SizesAdmin'
import { PricesAdmin } from '../../ui/AdminComponents/PricesAdmin/PricesAdmin'
import { ImageAdmin } from '../../ui/AdminComponents/ImageAdmin/ImageAdmin'
import { CategoriesAdmin } from '../../ui/AdminComponents/CategoriesAdmin/CategoriesAdmin'

export const AdminScreen = () => {

    const {activeOption} = useStoreAdmin()

    return(
        <div className={styles.containerPrincipal}>
            <HeaderAdmin/>
            {activeOption === 'product' && <ProductsAdmin/>}
            {activeOption === 'users' && <UsersAdmin/>}
            {activeOption === 'discounts' && <DiscountsAdmin/>}
            {activeOption === 'colors' && <ColorsAdmin/>}
            {activeOption === 'sizes' && <SizesAdmin/>}
            {activeOption === 'prices' && <PricesAdmin/>}
            {activeOption === 'images' && <ImageAdmin/>}
            {activeOption === 'categories' && <CategoriesAdmin/>}
            {activeOption === '' &&
             <div className={styles.containerAdmin}>
                <h1>ADMIN</h1>
             </div>
             }
            <Footer/>
        </div>
    )
}