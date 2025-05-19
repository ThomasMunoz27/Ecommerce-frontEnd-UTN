// Hacer un estado global que cambiara el contenido de este ListContacts ya que no tendra una prop title, pero todos los selectores de categorias en header y dropdown redireccionaran a esta pagina, solamente cambiaran el estado global

import  { useEffect, useState } from 'react'
import { ListProducts } from '../../ui/ListProducts/ListProducts'
import { Footer } from '../../ui/footer/Footer'
import { Header } from '../../ui/Headers/Header/Header'
import style from './ProductCategoryScreen.module.css'
import { getAllProducts } from '../../../cruds/crudProduct'
import { useStoreModal } from '../../../store/useStoreModal'
import { IProduct } from '../../../types/IProduct'
import { useStoreCategory } from '../../../store/useStoreCategory'
import { ICategory } from '../../../types/ICategory'
import { AddProductModal } from '../../ui/Modals/AddProductModal/AddProductModal'

export const ProductCategoryScreen = () => {

     const {modalAddProduct} = useStoreModal()
     const {activeCategory, setActiveCategory} = useStoreCategory()
    const [products, setProducts] = useState<IProduct[]>([])
      useEffect (() => {
        const storedCategory = localStorage.getItem('activeCategory')
        if(storedCategory) {
          const parsed: ICategory = JSON.parse(storedCategory)
          setActiveCategory(parsed)
        }
      }, [])
  
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
    {modalAddProduct && <div className={style.modalBackdrop}><AddProductModal/></div>}

    <Footer/>

    </div>
    </div>
  )
}
