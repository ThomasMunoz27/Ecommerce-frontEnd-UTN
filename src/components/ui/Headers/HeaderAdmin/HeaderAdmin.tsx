import { useNavigate } from 'react-router'
import { useStoreAdmin } from '../../../../store/useStoreAdmin'
import style from './HeaderAdmin.module.css'

export const HeaderAdmin = () => {

    const navigate = useNavigate()
    const {setActiveOption} = useStoreAdmin()

    const handleClik = () => {
        navigate('/my-account')
    }

    return (
        <div className={style.headerContainer}>
        <header className={style.mainHeader}>
            <img src="./img/Logo.png" alt="" className={style.headerLogo}/>
            <nav>
                <a onClick={() => setActiveOption('users')}>Usuarios</a>
                <a onClick={() => setActiveOption('product')}>Productos</a>
            </nav>
            <div className={style.searchBarIconsContainer}>
                <span className="material-symbols-outlined">
                    inventory_2
                </span>
                <input type="text" placeholder='Buscar' className={style.searchBar}/>
                
            <a href=""><img src="./icons/userCircle.svg" alt="" onClick={handleClik}/></a>
    
            </div>
        </header>
    </div>
    )
}
