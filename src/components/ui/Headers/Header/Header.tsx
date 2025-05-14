import { Link, useNavigate } from 'react-router';
import style from './Header.module.css'
import { useEffect, useState } from 'react';
import { useStoreCart } from '../../../../store/useStoreCart';
import { useStoreCategory } from '../../../../store/useStoreCategory';
import { getCategoryByName } from '../../../../cruds/crudCategory';

export const Header = () => {

  const [cantProductsInCart, setCantProductsInCart] = useState(0)
   const {setActiveCategory} = useStoreCategory()
  const {productsInCart} = useStoreCart()
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)

  const handleClick = () => {
    navigate("/my-account")
  }
  const handleCloseResponsive = () => {
    setIsVisible(false)
  }

  const handleCategoryClick = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const categoryName = e.currentTarget.textContent
    if(categoryName){
      const category = await getCategoryByName(categoryName)
      if(category){
        setActiveCategory(category)
        navigate("/product-category")
      }
    }
    // Aqui deberiamos establecer el store de categoria seleccionada a la variable category y listo
    // navigate("/product-category")
  }

  useEffect(() => {
    const cantProducts = productsInCart.map(p => p.quantity).reduce((sum, actVal) => sum + actVal, 0)
    setCantProductsInCart(cantProducts)


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

      <a onClick={() => navigate("/products-NUEVA-RUTA-POR-HACER")}>Productos</a>
      <a onClick={() => setIsVisible(true)} className={style.hamburguerIcon}><img src='./icons/hamburguerMenu.svg'/></a>
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
        <a  onClick={handleCategoryClick}>Niños</a>
        <a  onClick={handleCategoryClick}>Deportes</a>
        <a  onClick={handleCategoryClick}>Calzado</a>
        <a  onClick={handleCategoryClick}>Indumentaria</a>
        <a  onClick={handleCategoryClick}>Hombre</a>
        <a  onClick={handleCategoryClick}>Mujer</a>
        <a  onClick={handleCategoryClick}>Ofertas</a>
      </nav>
    </div>
    {/* <DropdownHeader></DropdownHeader> */}
    </div>
    {isVisible && ( <div className={style.responsiveModal}>
       <nav>
        <a  onClick={handleCategoryClick}>Niños</a>
        <a  onClick={handleCategoryClick}>Deportes</a>
        <a  onClick={handleCategoryClick}>Calzado</a>
        <a  onClick={handleCategoryClick}>Indumentaria</a>
        <a  onClick={handleCategoryClick}>Hombre</a>
        <a  onClick={handleCategoryClick}>Mujer</a>
        <a  onClick={handleCategoryClick}>Ofertas</a>
      </nav>
      <button onClick={handleCloseResponsive}>X</button>
    </div>)}
   
    </>
  );
};