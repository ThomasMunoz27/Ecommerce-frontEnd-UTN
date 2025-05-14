import styles from './AdminAddProductModal.module.css'

export const AdminAddProductModal = () => {
    return (
        <div className={styles.containerPrincipal}>
            <div className={styles.containerTitle}>
                <h1>Producto1</h1>
                <h1>Id: 1</h1>
            </div>
            <form action="">
                <div className={styles.containerSelectors}>
                    <select name="" id="">
                        <option value="" disabled selected>Talle</option>
                    </select>
                    <select name="" id="">
                        <option value="" disabled selected>Color</option>
                    </select>
                    <select name="" id="">
                        <option value="" disabled selected>Sexo</option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                        <option value="otro">Otro</option>
                    </select>
                    <input type="number" name="" id="" placeholder='stock'/>
                    <input type="number" name="" id="" placeholder='Precio'/>
                </div>
                <div className={styles.imageAndDescription}>
                    <textarea className={styles.description} name="" id="" placeholder='Descripcion'></textarea>
                    <div className={styles.file}>
                        <label htmlFor="">Imagen</label>
                        <input type="file" />
                    </div>
                </div>
                <div className={styles.containerButtons}>
                    <button>Cancelar</button>
                    <button>Aceptar</button>
                </div>
            </form>
        </div>
    )
}