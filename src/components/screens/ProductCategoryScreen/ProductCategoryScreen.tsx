// Hacer un estado global que cambiara el contenido de este ListContacts ya que no tendra una prop title, pero todos los selectores de categorias en header y dropdown redireccionaran a esta pagina, solamente cambiaran el estado global

import  { useEffect, useState } from 'react'
import { ListProducts } from '../../ui/ListProducts/ListProducts'
import { Footer } from '../../ui/footer/Footer'
import { Header } from '../../ui/Headers/Header/Header'
import style from './ProductCategoryScreen.module.css'
import { getAllProductsPaged } from '../../../cruds/crudProduct'
import { useStoreModal } from '../../../store/useStoreModal'
import { IProduct } from '../../../types/IProduct'
import { useStoreCategory } from '../../../store/useStoreCategory'
import { ICategory } from '../../../types/ICategory'
import { AddProductModal } from '../../ui/Modals/AddProductModal/AddProductModal'
import { FilterModal } from '../../ui/Modals/FilterModal/FilterModal'
import { useStoreFilterModal } from '../../../store/useStoreFilterModal'

export const ProductCategoryScreen = () => {

    const {modalAddProduct} = useStoreModal()

    const {visible} = useStoreFilterModal()

    const {activeCategory, setActiveCategory} = useStoreCategory()
    const [products, setProducts] = useState<IProduct[]>([])

    const [paginaActual, setPaginaActual] = useState(0)

    const [totalPages, setTotalPages] = useState(0)


      useEffect (() => {
        const storedCategory = localStorage.getItem('activeCategory')
        if(storedCategory) {
          const parsed: ICategory = JSON.parse(storedCategory)
          setActiveCategory(parsed)
        }
      }, [])
      useEffect(() => {
              getPagedProducts()
            }, [paginaActual, activeCategory])
            const getPagedProducts = async () => {
              const pagedProducts = await getAllProductsPaged(paginaActual, 10, activeCategory?.id)
              setProducts(pagedProducts.content)
              setTotalPages(pagedProducts.totalPages)
            }
                 

  let sexArray: string[] = []
  if(products.length > 0){
    
      products.map((product) => {
      if(!sexArray.includes(product.sex)){
         sexArray.push(product.sex) 
      }
    })
  }

  

  return (
    <div>
           <div className={style.screen}>

    <Header/>
    <div>
    {/* {modalAccount && <AccountModal/>} */}
    </div>
    <ListProducts productsArray={products} customClass='containerCategoryScreen'/>
    {modalAddProduct && <div className={style.modalBackdrop}><AddProductModal/></div>}


     <div className={style.pagination}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPaginaActual(i)}
            style={{
              margin: '4px',
              padding: '6px 10px',
              fontWeight: i === paginaActual ? 'bold' : 'normal',
              backgroundColor: i === paginaActual ? 'blue' : 'black'
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>

      

      {/* Filter modal */}
      
                {visible && <FilterModal sexArray={sexArray}/>}

    <Footer/>

    </div>
    </div>
  )
}
