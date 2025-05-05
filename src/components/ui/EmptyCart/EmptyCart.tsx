import { Link } from 'react-router'
import styles from './EmptyCart.module.css'

export const EmptyCart = () => {
  return (
    <div className={styles.mainContainer}>

            <div className={styles.emptyCart}>
                <h2>EL carrito está vacio</h2>
                <p>Los productos que agregues apareceran aqui</p>

                <Link to="/" className={styles.beginButton}>Empezar <span>➟</span></Link>
            </div>
        </div>
  )
}
