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
                    <p onClick={() => setActiveOption('discounts')}>Descuentos</p>
                    <p onClick={() => setActiveOption('prices')}>Precios</p>
                    <p onClick={() => setActiveOption('colors')}>Color</p>
                    <p onClick={() => setActiveOption('sizes')}>Talles</p>
                    <p onClick={() => setActiveOption('images')}>Imagenes</p>
                    <p onClick={() => setActiveOption('categories')}>Categorias</p>
                    <p onClick={() => setActiveOption('countries')}>Paises</p>
                    <p onClick={() => setActiveOption('provinces')}>Provincias</p>
                    <p onClick={() => setActiveOption('localities')}>Localidades</p>
                    <p onClick={() => setActiveOption('addresses')}>Direcciones</p>
                    <p onClick={() => setActiveOption('bills')}>Facturas</p>
                </div>
                
            </div>
    </div>
    )
}
