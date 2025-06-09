
import { useStoreModal } from '../../../../store/useStoreModal'
import { useStoreUsers } from '../../../../store/useStoreUsers'
import { errorAlert } from '../../../../utils/errorAlert'

import style from './AdminEditUser.module.css'


export const AdminEditUser = () => {

    const {activeUser} = useStoreUsers()
    const {closeAdminModalEditUser} = useStoreModal()

    

    return (
        <div className={style.containerPrincipal}>
            <h1>Editar Usuario</h1>
            <form action="">
                <div className={style.containerValues}>
                    
                    <label htmlFor="">Nombre</label>
                    <input type="text" name="name" id="" value={activeUser?.name} />

                    <label htmlFor="">Apellido</label>
                    <input type="text" name="" id="" value={activeUser?.lastname}/>

                    <label htmlFor="">Nombre Usuario</label>
                    <input type="text" name="username" id="" value={activeUser?.username!}/>

                    <label htmlFor=""></label>

                    <div className={style.containerButtons}>
                        <button onClick={closeAdminModalEditUser}>Cancelar</button>
                        <button type='submit'>Aceptar</button>
                    </div>
                </div>
            </form>
        </div>
    )
}