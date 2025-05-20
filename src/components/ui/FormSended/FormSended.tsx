import { useStoreCheckout } from '../../../store/useStoreCheckout'
import styles from './FormSended.module.css'
export const FormSended = () => {
    const{formSumbited, setValidFormSumbited} = useStoreCheckout()

    const handleEditForm = () => {
        setValidFormSumbited(false)
    }

  return (
    <>
        <div className={styles.dataContainer}>
            <div className={styles.contactContainer}>
                    <div className={styles.contactHeader}>
                        <h3>Contacto</h3>
                        <p onClick={handleEditForm} className={styles.editForm}>Editar</p>

                    </div>
                    <p className={styles.dataSended}>{formSumbited?.email}</p>
                    <p className={styles.dataSended}>{formSumbited?.name}</p>

                </div>
                <div className={styles.directionContainer}>
                    <div className={styles.contactHeader}>
                        <h3>Direccion</h3>
                        <p onClick={handleEditForm} className={styles.editForm}>Editar</p>
                    </div>
                    <h4>Direcion de envío</h4>

                    <p className={styles.dataSended}>{formSumbited?.country}</p>
                    <p className={styles.dataSended}>{formSumbited?.province}</p>
                    <p className={styles.dataSended}>{formSumbited?.locality}</p>
                    <p className={styles.dataSended}>{formSumbited?.street}</p>
                    <p className={styles.dataSended}>{formSumbited?.cp}</p>
                    <p className={styles.dataSended}>{formSumbited?.phoneNumber}</p>
                    <p className={styles.dataSended}>{formSumbited?.dni}</p>
                
                </div>
        </div>
    
    
    </>
  )
}
