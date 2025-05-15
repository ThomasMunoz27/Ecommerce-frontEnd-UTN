import styles from './SubModalAdmin.module.css'

export const SubModalAdmin = () => {




    return (
        <div className={styles.containerPrincipal}>
            <div className={styles.containerGeneralSizes}>
                <h3 className={styles.title}>Agregar Talles</h3>
                <select name="" id="">
                    <option value="" disabled selected>Talles</option>
                </select>
            </div>
            <div className={styles.containerProductSizes}>
                <h3 className={styles.title}>Eliminar Talles: Producto</h3>
                <select name="" id="">
                    <option value="" disabled selected>Talles</option>
                    <option value="">s</option>
                    <option value="">m</option>
                </select>
            </div>

            <div className={styles.containerButtons}>
                <button>Aceptar</button>
                <button>Cancelar</button>
            </div>
        </div>
    )
}