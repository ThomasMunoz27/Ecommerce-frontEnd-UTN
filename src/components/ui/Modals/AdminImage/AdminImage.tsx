import { useStoreImages } from '../../../../store/useStoreImages'
import { useStoreModal } from '../../../../store/useStoreModal'
import styles from './AdminImage.module.css'

export const AdminImage = () => {

    const {closeModalAdminImage} = useStoreModal()
    const {activeImage} = useStoreImages()

    return (
        <div className={styles.containerPrincipal}>
            <div className={styles.containerTitle}>
                <h1>Manejo de Imagenes</h1>
            </div>
            <div className={styles.containerImage}> 
                <h3>{activeImage ? 'Editar Imagen' : 'Crear Imagen'}</h3>
                {activeImage && (
                    <img className={styles.image} src={activeImage.url} alt="" />
                )}
                <input type="file" />
            </div>
            <div className={styles.containerButtons}>
                <button onClick={closeModalAdminImage}>Cancelar</button>
                <button>Aceptar</button>
            </div>
        </div>
    )
}