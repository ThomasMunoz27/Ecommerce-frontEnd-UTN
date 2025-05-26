import { useNavigate } from 'react-router'
import { useStoreAdmin } from '../../../../store/useStoreAdmin'
import style from './HeaderAdmin.module.css'

export const HeaderAdmin = () => {

    const navigate = useNavigate()
    const {setActiveOption} = useStoreAdmin()

    const handleClikAccount = () => {
        navigate('/my-account')
    }

    const handleClikInit = () => {
        navigate('/')
    }

    return (
        <div className={style.headerContainer}>
            <div className={style.navContainer}>
                <header className={style.mainHeader}>
                    <img src="./img/Logo.png" alt="" className={style.headerLogo}/>
                    <nav>
                        <a onClick={() => handleClikInit()}>Inicio</a>
                        
                    </nav>
                    <div className={style.searchBarIconsContainer}>
                        <span className="material-symbols-outlined">
                            inventory_2
                        </span>
                        <input type="text" placeholder='Buscar' className={style.searchBar}/>
                        
                    <a href=""><img src="./icons/userCircle.svg" alt="" onClick={handleClikAccount}/></a>
            
                    </div>
                </header>
                <div className={style.minHeader}>
                    <p onClick={() => setActiveOption('product')}>Productos</p>
                    <p onClick={() => setActiveOption('users')}>Usuarios</p>
                    <p>Descuentos</p>
                    <p>Precios</p>
                    <p>Talles</p>
                    <p>Color</p>
                </div>
            </div>
    </div>
    )
}
