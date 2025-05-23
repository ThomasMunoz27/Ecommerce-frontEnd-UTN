import { useStoreModal } from '../../../../store/useStoreModal'
import styles from './ModalPrice.module.css'

export const ModalPrice = () => {
    const {closeModalPrices} = useStoreModal()

    return(
        <div className={styles.containerPrincipal}>
            
            <h1>Editar Precios</h1>
            
            <form action="" className={styles.containerForm}>
                <div className={styles.containerPrices}>
                    <div className={styles.containerPricesColumn}>
                        <label htmlFor="">Precio Compra</label>
                        <input type="number" />
                    </div>

                    <div className={styles.containerPricesColumn}>
                        <label htmlFor="">Precio Venta</label>
                        <input type="number" name="" id="" />
                    </div>
                </div>
                <hr />

                <div className={styles.containerDiscount}>
                    <h3>Descuento</h3>
                    <div className={styles.discountData}>
                        <div className={styles.discountColumn}>
                            <label htmlFor="">Nombre</label>
                            <input type="text" name="" id="" placeholder='Nombre'/>
                            <label htmlFor="">Hora Desde</label>
                            <input type="text" name="" id="" placeholder='Hora desde '/>
                            <label htmlFor="">Hora Hasta</label>
                            <input type="text" name="" id="" placeholder='Hora hasta'/>

                        </div>
                        <div className={styles.discountColumn}>
                            <label htmlFor="">Precio Promocional</label>
                            <input type="number" name="" id="" placeholder='Precio Promocional'/>
                            <label htmlFor="">Fecha Desde</label>
                            <input type="text" name="" id="" placeholder='Fecha Desde'/>
                            <label htmlFor="">Fecha Hasta</label>
                            <input type="text" name="" id="" placeholder='Fecha Hasta'/>

                        </div>
                    </div>
                    <textarea name="" id="" placeholder='Descripcion'></textarea>
                </div>
                <div className={styles.containerButtons}>
                    <button onClick={closeModalPrices}>Cancelar</button>
                    <button>Aceptar</button>
                </div>
            </form>
        </div>
    )
}