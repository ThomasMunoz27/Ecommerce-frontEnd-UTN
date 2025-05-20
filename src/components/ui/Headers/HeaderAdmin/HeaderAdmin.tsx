import style from './HeaderAdmin.module.css'

export const HeaderAdmin = () => {
    return (
        <div className={style.headerContainer}>
        <header className={style.mainHeader}>
            <img src="./img/Logo.png" alt="" className={style.headerLogo}/>
            <nav>
                <a>Usuarios</a>
                <a>Productos</a>
            </nav>
            <div className={style.searchBarIconsContainer}>
                <span className="material-symbols-outlined">
                    inventory_2
                </span>
                <input type="text" placeholder='Buscar' className={style.searchBar}/>
                
            <a href=""><img src="./icons/userCircle.svg" alt="" /></a>
    
            </div>
        </header>
    </div>
    )
}
