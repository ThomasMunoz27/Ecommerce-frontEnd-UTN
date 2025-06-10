import { Link, useNavigate } from 'react-router';
import style from './Header.module.css'
import { useEffect, useState } from 'react';
import { useStoreCart } from '../../../../store/useStoreCart';
import { useStoreCategory } from '../../../../store/useStoreCategory';
import { getCategoryByName } from '../../../../cruds/crudCategory';
import { useStoreUsers } from '../../../../store/useStoreUsers';
import { getUserById, getUserByName } from '../../../../cruds/crudUsers';
import useStoreProduct from '../../../../store/useStoreProduct';
import { IProduct } from '../../../../types/IProduct';

export const Header = () => {

   const [showAdmin, setShowAdmin] = useState(false)
   const [search, setSearch] = useState("")
   const [searchSugestions, setSearchSugestions] = useState<IProduct[]>([])

   const {user, userName, setUser} = useStoreUsers()
   
   const {fetchProduct, products, setActiveProduct} = useStoreProduct()


  const [cantProductsInCart, setCantProductsInCart] = useState(0)
   const {setActiveCategory} = useStoreCategory()
  const {productsInCart} = useStoreCart()
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)
  
      useEffect(() => {
          const fetchUser = async() => {
              const usuarioName = localStorage.getItem('username')
              if(usuarioName){
                  const usuario = await getUserByName(usuarioName) 
                  setUser(usuario)
                  if(usuario.user === 'admin'){
                    setShowAdmin(true)
                  }else{
                    false
                  }
              }
          } 
          fetchUser()
          fetchProduct("active")
      }, [userName])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target
    setSearch(value)

    if(value.trim().length > 0){
      const filtered = products.filter(p=>
          p.name.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5)
      setSearchSugestions(filtered)
    }else{
      setSearchSugestions([])
    }
    console.log(search)
  }

  const handleClick = () => {
    navigate("/my-account")
  }

  const handleNavigateToAdmin = () => {
    navigate("/admin")
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
        localStorage.setItem('categoryName', category.name)
        navigate("/product-category")
      }
    }
    setIsVisible(false)
    // Aqui deberiamos establecer el store de categoria seleccionada a la variable category y listo
    // navigate("/product-category")
  }

  useEffect(() => {
    const cantProducts = productsInCart.map(p => p.quantity).reduce((sum, actVal) => sum + actVal, 0)
    setCantProductsInCart(cantProducts)


  }, [productsInCart])
  // console.log("Valor de user.user:", user?.user);

  const handleDetails = (product: IProduct) => {
        setActiveProduct(product)
        navigate("/product-detail")
    }

  return (
    <>
    <div className={style.headerContainer}>

    <header className={style.mainHeader}>
    <img src="./img/Logo.png" alt="" className={style.headerLogo}  onClick={() => {
      navigate("/")
    }}/>
    <nav>
      <a onClick={() => navigate("/")}>Inicio</a>

      <a onClick={() => setIsVisible(true)} className={style.hamburguerIcon}><img src='./icons/hamburguerMenu.svg'/></a>
    </nav>
    <div className={style.searchBarIconsContainer}>
      {showAdmin && (
        <div className={style.adminIcon}>
          <span onClick={handleNavigateToAdmin} className="material-symbols-outlined">
                                inventory_2
          </span>

        </div>
        )
      } 
    <div className={style.searchBarContainer}>
      <input type="text" placeholder='Buscar' className={style.searchBar} value={search} onChange={handleSearch}/>
      {searchSugestions.length > 0 && (
        <ul className={style.autocompleteList}>
          {searchSugestions.map((product) => (
            <li key={product.id} onClick={() => handleDetails(product)}>
              {product.name}
            </li>
          ))}
        </ul>
      )}

    </div>

    <a href=""><img src="./icons/userCircle.svg" alt="" onClick={handleClick}/></a>
    <div className={style.cartContainer}>
      {cantProductsInCart > 0 && <span className={style.cartCounter} onClick={() => navigate("/my-cart")}>{cantProductsInCart}</span>}
      <Link to="/my-cart"><img src="./icons/cartIcon.svg" alt="" /></Link>
    </div>
    </div>


    </header>
    <div className={style.subHeader}>
      <nav>
        <a  onClick={handleCategoryClick}>Niños</a>
        <a  onClick={handleCategoryClick}>Deportes</a>
        <a  onClick={handleCategoryClick}>Calzados</a>
        <a  onClick={handleCategoryClick}>Indumentaria</a>
        <a  onClick={handleCategoryClick}>Hombre</a>
        <a  onClick={handleCategoryClick}>Mujer</a>
      </nav>
    </div>
    {/* <DropdownHeader></DropdownHeader> */}
    </div>
    {isVisible && ( <div className={style.responsiveModal}>
       <nav>
        <a  onClick={() => {
          navigate('/')
          setIsVisible(false)
        }}>Inicio</a>
        <a  onClick={handleCategoryClick}>Niños</a>
        <a  onClick={handleCategoryClick}>Deportes</a>
        <a  onClick={handleCategoryClick}>Calzados</a>
        <a  onClick={handleCategoryClick}>Indumentaria</a>
        <a  onClick={handleCategoryClick}>Hombre</a>
        <a  onClick={handleCategoryClick}>Mujer</a>
      </nav>
      <button onClick={handleCloseResponsive}>X</button>
    </div>)}
   
    </>
  );
};