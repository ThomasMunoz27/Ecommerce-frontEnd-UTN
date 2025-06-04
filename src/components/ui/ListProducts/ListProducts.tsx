import { FC } from 'react';
import { IProduct } from '../../../types/IProduct';
import style from './ListProducts.module.css'
import { CardProduct } from '../CardProduct/CardProduct';
import { useStoreCategory } from '../../../store/useStoreCategory';
import { useStoreFilterModal } from '../../../store/useStoreFilterModal';


interface Props {
    productsArray: IProduct[]
    title?: String | undefined
    customClass?: string
}

export const ListProducts: FC<Props> = ({productsArray, title, customClass}) => {
   
       const {activeCategory} = useStoreCategory()

        const {toggleVisible, visible} = useStoreFilterModal()

      //  const getPagedProducts = async () => {
      //    const pagedProducts = await getAllProductsPaged(0,1)
      //    console.log(pagedProducts)
      // }

      // const paged = getPagedProducts()
      const {orderAsc, orderDesc} = useStoreFilterModal()

      const productosOrdenados = [...productsArray].sort((a, b) => {
      if (orderAsc) return a.prices.salePrice - b.prices.salePrice;
      if (orderDesc) return b.prices.salePrice - a.prices.salePrice;
      return 0; // sin orden
    });
    
   
  return (
    <div className={`${style.container} ${ customClass ? style[customClass] : ''}`}>
    <h2>{activeCategory && !title ? activeCategory.name : title}</h2>
    <button className={style.filterButton} onClick={() => {
      toggleVisible()
      console.log(visible)
      }}>Filtrar</button>
    <div className={style.productsContainer}>
    {productosOrdenados.length > 0 ? productosOrdenados.map((product) => {
  return (
    <CardProduct
      key={product.id}
      product={product}
    />
  );
}) : <h2 className={style.stockText}>No hay productos en stock</h2>}

    </div>
        </div>
  );
};