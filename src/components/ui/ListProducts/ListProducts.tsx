import { FC} from 'react';
import { IProduct } from '../../../types/IProduct';
import style from './ListProducts.module.css'
import { useStoreCart } from '../../../store/useStoreCart';

interface Props {
    productsArray: IProduct[]
}

export const ListProducts: FC<Props> = ({productsArray}) => {
   
    const {addProductToCart} = useStoreCart()

  return (
    <div className={style.container}>
    <h2>Productos</h2>
    <div className={style.productsContainer}>
        
        {productsArray && productsArray.map((product) => (
            <div className={style.productCard}>
                <img className={style.cardImg} src="https://th.bing.com/th/id/R.b0348852ef2db81245b1411170a9a7ea?rik=%2brM46PRMTUiarA&pid=ImgRaw&r=0" alt="" />

                <div className={style.cardText}>
                    <p>{`${product.name} ${product.sex}`}</p>
                    <p className={style.textCategory}>{product.category.name}</p>
                </div>
                <button onClick={() => addProductToCart(product)}>Añadir al carrito</button>
            {/* <p>{product.price.salePrice}</p> No consigo iterar sobre el precio del producto*/}
            
            </div>
        ))}
    </div>
        </div>
  );
};