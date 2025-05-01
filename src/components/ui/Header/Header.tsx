import style from './Header.module.css'
export const Header = () => {
  return (
    <>
    <div className={style.headerContainer}>

    <header className={style.mainHeader}>
    <img src="./img/Logo.png" alt="" className={style.headerLogo} />
    <nav>
      <a href="">Inicio</a>
      <a href="">Productos</a>
    </nav>
    <div className={style.searchBarIconsContainer}>
      
    <input type="text" placeholder='Buscar' className={style.searchBar}/>

    <a href=""><img src="./icons/userCircle.svg" alt="" /></a>
    <a href=""><img src="./icons/cartIcon.svg" alt="" /></a>
    </div>


    </header>
    <div className={style.subHeader}>
      <nav>
        <a href="">Niños</a>
        <a href="">Deportes</a>
        <a href="">Calzado</a>
        <a href="">Indumentaria</a>
        <a href="">Hombre</a>
        <a href="">Mujer</a>
        <a href="">Ofertas</a>
      </nav>
    </div>
    </div>
    </>
  );
};