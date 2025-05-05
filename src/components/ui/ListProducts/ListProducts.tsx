import { FC} from 'react';
import { IProduct } from '../../../types/IProduct';
import style from './ListProducts.module.css'
import { CardProduct } from '../CardProduct/CardProduct';

interface Props {
    productsArray: IProduct[]
}

export const ListProducts: FC<Props> = ({productsArray}) => {
   
    

  return (
    <div className={style.container}>
    <h2>Productos</h2>
    <div className={style.productsContainer}>
        
        {productsArray && productsArray.map((product) => (
         <CardProduct key={product.id} product={product}/>
        ))}
    </div>
        </div>
  );
};