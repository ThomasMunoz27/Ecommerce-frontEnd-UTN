import { useStoreModal } from '../../../../store/useStoreModal'
import styles from './SubAdminSize.module.css'

export const SubAdminSize = () => {
    const {modalAdminSubSize} = useStoreModal()
    if (modalAdminSubSize.option === 1) {
        return(
            <div>

            </div>
        )
    } else if(modalAdminSubSize.option) {
        return (
            <div>
                
            </div>
        )
    }
}