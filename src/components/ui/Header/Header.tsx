import { Link } from 'react-router';
import style from './Header.module.css'
import { useEffect, useState } from 'react';
import { useStoreCart } from '../../../store/useStoreCart';
import { DropdownHeader } from '../dropdownHeader/dropdownHeader';
export const Header = () => {

  const [cantProductsInCart, setCantProductsInCart] = useState(0)
  const {productsInCart} = useStoreCart()

  useEffect(() => {

    setCantProductsInCart(productsInCart.length)


  }, [productsInCart])

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
    <div className={style.cartContainer}>
      {cantProductsInCart > 0 && <span className={style.cartCounter}>{cantProductsInCart}</span>}
      <Link to="/"><img src="./icons/cartIcon.svg" alt="" /></Link>
    </div>
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
    <DropdownHeader></DropdownHeader>
    </div>
    </>
  );
};