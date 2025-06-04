import { useNavigate } from 'react-router'
import styles from './ProfileHeader.module.css'



export const ProfileHeader = () => {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/')
    }

    return (
        <div className={styles.containerPrincipal}>
            <div onClick={handleClick} className={styles.arrowBack}>
                <span className="material-symbols-outlined">
                    arrow_back
                </span>
            </div>
            <div className={styles.containerLogo}>
            <img src="./img/Logo.png" alt="" className={styles.headerLogo} onClick={() => handleClick} />
            </div>
        </div>
    )
}