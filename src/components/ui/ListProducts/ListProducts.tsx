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
    {productsArray.map((product) => {
  console.log('imageId:', product.image?.id);
  // debugger; // <- descomentá esto si estás usando herramientas como Chrome DevTools
  return (
    <CardProduct
      key={product.id}
      product={product}
      categoryId={product.category.id}
      imageUrl = {product.image?.url}
    />
  );
})}

    </div>
        </div>
  );
};