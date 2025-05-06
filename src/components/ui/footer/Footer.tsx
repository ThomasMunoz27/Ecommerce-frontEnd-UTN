import { Link } from 'react-router'
import styles from './Footer.module.css'
export const Footer = () => {
  return (
    <div className={styles.mainContainer}>
        <p><Link to="/nuestros-datos" className={styles.link}>Nuestros Datos</Link>   |   
          <Link to="/terminos-y-condiciones" className={styles.link}> Términos y Condiciones</Link>   |   
          <Link to="/terminos-condiciones-promociones" className={styles.link}> Términos y Condiciones Promociones</Link>   |   
          <Link to="/politica-de-privacidad" className={styles.link}> Política de Privacidad</Link>   |   
          <Link to="/reclamos" className={styles.link}> Reclamos</Link>
          </p>
        <p className={styles.copyright}>© 2024 Undefined Argentina Mendoza</p>

    </div>
  )
}
