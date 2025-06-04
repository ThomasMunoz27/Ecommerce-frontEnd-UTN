import { Link } from 'react-router'
import { Header } from '../../Headers/Header/Header'
import styles from './FailurePay.module.css'
import { Footer } from '../../footer/Footer'


export const FailurePay = () => {
  return (
    <>
        <Header></Header>
        <div className={styles.mainContainer}>
            <div className={styles.failureContainer}>
              <div className={styles.failureTitle}>
                <img src="src\assets\cancel_cross.svg" alt="" />
                <h2>Error al Procesar el Pago </h2>
              </div>

                <div className={styles.infoError}>
                    <h3>Intente otra vez mas tarde</h3>
                    <p>Si sigue experimentando el mismo resultado contacte a soporte</p>
                </div>

            </div>
            <div className={styles.otherProducts}>
                <h4>Hecha un vistazo a otros productos que podrian interesarte</h4>

                <Link to="/" className={styles.button}>Ver productos <img src="src\assets\arrow_right.svg" alt="flecha" /></Link>
            </div>
            
        </div>
        
        <Footer></Footer>
    </>
  )
}
