import styles from './ProfileHeader.module.css'


export const ProfileHeader = () => {
    return (
        <div className={styles.containerPrincipal}>
            <div className={styles.arrowBack}>
                <span className="material-symbols-outlined">
                    arrow_back
                </span>
            </div>
            <div className={styles.containerLogo}>
            <img src="./img/Logo.png" alt="" className={styles.headerLogo} />
            </div>
        </div>
    )
}