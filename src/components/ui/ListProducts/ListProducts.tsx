import { FC} from 'react';
import { IProduct } from '../../../types/IProduct';
import style from './ListProducts.module.css'
import { CardProduct } from '../CardProduct/CardProduct';
import { useStoreCategory } from '../../../store/useStoreCategory';


interface Props {
    productsArray: IProduct[]
    title?: String | undefined
}

export const ListProducts: FC<Props> = ({productsArray, title}) => {
   
       const {activeCategory} = useStoreCategory()
      //  const getPagedProducts = async () => {
      //    const pagedProducts = await getAllProductsPaged(0,1)
      //    console.log(pagedProducts)
      // }

      // const paged = getPagedProducts()



  return (
    <div className={style.container}>
    <h2>{activeCategory && !title ? activeCategory.name : title}</h2>
    <button className={style.filterButton}>Filtrar</button>
    <div className={style.productsContainer}>
    {productsArray.length > 0 ? productsArray.map((product) => {
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