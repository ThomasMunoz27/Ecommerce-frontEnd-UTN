
import {  useNavigate } from 'react-router'
import { useStoreDataFooter } from '../../../store/useStoreDataFooter'
import styles from './Footer.module.css'
export const Footer = () => {
  const {setActiveOption} = useStoreDataFooter()
  const navigate = useNavigate()

  const handleClik = (option : string) => {
    navigate('/footer-data')
    setActiveOption(option)
  }


  return (
    <div className={styles.footerContainer}>
        
      <div className={styles.linksContainer}>
        <p onClick={() => handleClik('aboutUs')} className={styles.link}>Nuestros Datos   |</p>
        
        <p onClick={() => handleClik('terms&Conditions')} className={styles.link}>Términos y Condiciones    |</p>

        <p onClick={() => handleClik('terms&ConditionsPromo')} className={styles.link}> Términos y Condiciones Promociones    |</p>

        <p onClick={() => handleClik('privacyPolicy')} className={styles.link}> Política de Privacidad</p>

      </div>
        <p className={styles.copyright}>© 2024 Undefined Argentina Mendoza</p>




      </div>
  )
}
