// Hacer un estado global que cambiara el contenido de este ListContacts ya que no tendra una prop title, pero todos los selectores de categorias en header y dropdown redireccionaran a esta pagina, solamente cambiaran el estado global

import  { useEffect, useState } from 'react'
import { ListProducts } from '../../ui/ListProducts/ListProducts'
import { Footer } from '../../ui/footer/Footer'
import { AccountModal } from '../../ui/Modals/AccountRegisterModal/AccountModal'
import { Header } from '../../ui/Headers/Header/Header'
import style from './ProductCategoryScreen.module.css'
import { getAllProducts } from '../../../cruds/crudProduct'
import { useStoreModal } from '../../../store/useStoreModal'
import { IProduct } from '../../../types/IProduct'
import { useStoreCategory } from '../../../store/useStoreCategory'

export const ProductCategoryScreen = () => {

    // const {modalAccount} = useStoreModal()
     const {activeCategory} = useStoreCategory()
    const [products, setProducts] = useState<IProduct[]>([])
  
      useEffect(() => {
          const fetchProducts = async () => {
            // Cambiar por fetch con activeCategory
              const arrayProducts = await getAllProducts()
              console.log(arrayProducts)
              const  arrayProductsfiltered =  arrayProducts.filter((product) => (product.category.name == activeCategory?.name))
              console.log(arrayProductsfiltered)
              setProducts(arrayProductsfiltered)
  
          }
          fetchProducts()
      }, [activeCategory])
  

  return (
    <div>
           <div className={style.screen}>

    <Header/>
    <div>
    {/* {modalAccount && <AccountModal/>} */}
    </div>
    <ListProducts productsArray={products}/>

    <Footer/>

    </div>
    </div>
  )
}
