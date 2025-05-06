import { Link } from 'react-router'
import styles from './EmptyCart.module.css'

export const EmptyCart = () => {
  return (
    <div className={styles.mainContainer}>

            <div className={styles.emptyCart}>
                <h2>El carrito está vacio</h2>
                <p className={styles.description}>Los productos que agregues apareceran aqui</p>

                <Link to="/" className={styles.beginButton}>Empezar <span>➟</span></Link>
            </div>
        </div>
  )
}
