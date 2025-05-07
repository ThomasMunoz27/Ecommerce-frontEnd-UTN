import { Link, useNavigate } from 'react-router';
import style from './Header.module.css'
import { useEffect, useState } from 'react';
import { useStoreCart } from '../../../../store/useStoreCart';

export const Header = () => {

  const [cantProductsInCart, setCantProductsInCart] = useState(0)
  const {productsInCart} = useStoreCart()
  const navigate = useNavigate()

  const handleClick = () => {
    navigate("/my-account")
  }

  const handleCategoryClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const category = e.currentTarget.textContent
    alert(`Setear estado global categoria seleccionada ${category}`)
    // Aqui deberiamos establecer el store de categoria seleccionada a la variable category y listo
    navigate("/product-category")
  }
  useEffect(() => {

    setCantProductsInCart(productsInCart.length)


  }, [productsInCart])

  return (
    <>
    <div className={style.headerContainer}>

    <header className={style.mainHeader}>
    <img src="./img/Logo.png" alt="" className={style.headerLogo}  onClick={() => {
      navigate("/")
    }}/>
    <nav>
      <a onClick={() => navigate("/")}>Inicio</a>

      <a >Productos</a>
    </nav>
    <div className={style.searchBarIconsContainer}>
      
    <input type="text" placeholder='Buscar' className={style.searchBar}/>

    <a href=""><img src="./icons/userCircle.svg" alt="" onClick={handleClick}/></a>
    <div className={style.cartContainer}>
      {cantProductsInCart > 0 && <span className={style.cartCounter}>{cantProductsInCart}</span>}
      <Link to="/my-cart"><img src="./icons/cartIcon.svg" alt="" /></Link>
    </div>
    </div>


    </header>
    <div className={style.subHeader}>
      <nav>
        <a href="" onClick={handleCategoryClick}>Niños</a>
        <a href="" onClick={handleCategoryClick}>Deportes</a>
        <a href="" onClick={handleCategoryClick}>Calzado</a>
        <a href="" onClick={handleCategoryClick}>Indumentaria</a>
        <a href="" onClick={handleCategoryClick}>Hombre</a>
        <a href="" onClick={handleCategoryClick}>Mujer</a>
        <a href="" onClick={handleCategoryClick}>Ofertas</a>
      </nav>
    </div>
    {/* <DropdownHeader></DropdownHeader> */}
    </div>
    </>
  );
};