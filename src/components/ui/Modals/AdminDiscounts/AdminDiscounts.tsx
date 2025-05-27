import { FC } from 'react'
import { useStoreModal } from '../../../../store/useStoreModal'
import { IDiscount } from '../../../../types/IDiscount'
import styles from './AdminDsicounts.module.css'

interface IAdminDiscounts {
    discount? : IDiscount
}

export const AdminDsicounts : FC<IAdminDiscounts> = ({discount}) => {
    const {closeModalAdminDiscount, modalAdminDiscount} = useStoreModal()
    if(modalAdminDiscount.option === 1){
        return(
            <div className={styles.containerPrincipal}>
                <div className={styles.containerTitle}>
                    <h1>Agregar Descuento</h1>
                </div>
                <form action="">
                    <div className={styles.containerData}>
                        <div className={styles.containerLeft}>

                            <label htmlFor="">Nombre</label>
                            <input type="text" name="" id="" />
                            <label htmlFor="">Descripcion</label>
                            <input type="text" name="" id="" />
                            <label htmlFor="">Fecha Desde</label>
                            <input type="text" name="" id="" />

                        </div>
                        <div className={styles.containerRigth}>

                            <label htmlFor="">Fecha Hasta</label>
                            <input type="text" name="" id="" />
                            <label htmlFor="">Hora Desde</label>
                            <input type="text" name="" id="" />
                            <label htmlFor="">Hora Hasta</label>
                            <input type="text" name="" id="" />
                            <label htmlFor="">Precio Promocional</label>
                            <input type="text" name="" id="" />

                        </div>
                        
                    </div>
                    <div className={styles.containerButtons}>
                        <button onClick={closeModalAdminDiscount}>Cancelar</button>
                        <button>Aceptar</button>
                    </div>
                </form>
            </div>
        )
    }else if (modalAdminDiscount.option === 2) {
        return (
            <div className={styles.containerPrincipal}>
                <div className={styles.containerTitle}>
                    <h1>Editar Descuento</h1>
                </div>
                 <form action="">
                    <div className={styles.containerData}>
                        <div className={styles.containerLeft}>
                            
                            <label htmlFor="">Nombre</label>
                            <input type="text" name="" id="" />
                            <label htmlFor="">Descripcion</label>
                            <input type="text" name="" id="" />
                            <label htmlFor="">Fecha Desde</label>
                            <input type="text" name="" id="" />

                        </div>
                        <div className={styles.containerRigth}>

                            <label htmlFor="">Fecha Hasta</label>
                            <input type="text" name="" id="" />
                            <label htmlFor="">Hora Desde</label>
                            <input type="text" name="" id="" />
                            <label htmlFor="">Hora Hasta</label>
                            <input type="text" name="" id="" />
                            <label htmlFor="">Precio Promocional</label>
                            <input type="text" name="" id="" />

                        </div>
                        
                    </div>
                    <div className={styles.containerButtons}>
                        <button onClick={closeModalAdminDiscount}>Cancelar</button>
                        <button>Aceptar</button>
                    </div>
                </form>
            </div>
        )
    }
}