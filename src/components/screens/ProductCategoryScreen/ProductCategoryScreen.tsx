// Hacer un estado global que cambiara el contenido de este ListContacts ya que no tendra una prop title, pero todos los selectores de categorias en header y dropdown redireccionaran a esta pagina, solamente cambiaran el estado global

import React, { useEffect, useState } from 'react'
import { ListProducts } from '../../ui/ListProducts/ListProducts'
import { Footer } from '../../ui/footer/Footer'
import { AccountModal } from '../../ui/Modals/AccountRegisterModal/AccountModal'
import { Header } from '../../ui/Headers/Header/Header'
import style from './ProductCategoryScreen.module.css'
import { getAllProducts } from '../../../cruds/crudProduct'
import { useStoreModal } from '../../../store/useStoreModal'
import { IProduct } from '../../../types/IProduct'

export const ProductCategoryScreen = () => {

    const {modalAccount} = useStoreModal()

    const [products, setProducts] = useState<IProduct[]>([])
  
      useEffect(() => {
          const fetchProducts = async () => {
              const arrayProducts = await getAllProducts()
              setProducts(arrayProducts)
  
          }
          fetchProducts()
      }, [])
  

  return (
    <div>
           <div className={style.screen}>

    <Header/>
    <div>
    {modalAccount && <AccountModal/>}
    </div>
    <ListProducts productsArray={products} title={"Todos los productos"}/>

    <Footer/>

    </div>
    </div>
  )
}
