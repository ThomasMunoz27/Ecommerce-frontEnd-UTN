import { useEffect, useState } from "react";
import { useStoreModal } from "../../../store/useStoreModal";

import { Footer } from "../../ui/footer/Footer";

import HeroCarousel from "../../ui/HeroCarousel/HeroCarousel";
import { ListProducts } from "../../ui/ListProducts/ListProducts";
import style from "./MainScreen.module.css";
import { IProduct } from "../../../types/IProduct";
import { getAllProductsPaged } from "../../../cruds/crudProduct";
import { Header } from "../../ui/Headers/Header/Header";
import { AddProductModal } from "../../ui/Modals/AddProductModal/AddProductModal";
import { useStoreFilterModal } from "../../../store/useStoreFilterModal";
import { FilterModal } from "../../ui/Modals/FilterModal/FilterModal";

export const MainScreen = () => {
  const { visible } = useStoreFilterModal();

  const { modalAddProduct } = useStoreModal();

  const [products, setProducts] = useState<IProduct[]>([]);

  const [paginaActual, setPaginaActual] = useState(0);

  const [totalPages, setTotalPages] = useState(0);

  const { closeModalAddProduct } = useStoreModal();
  const getPagedProducts = async () => {
    const pagedProducts = await getAllProductsPaged(paginaActual, 6);
    setProducts(pagedProducts.content);

    setTotalPages(pagedProducts.totalPages);
  };
  useEffect(() => {
    closeModalAddProduct();

    getPagedProducts();
  }, [paginaActual]);
  let sexArray: string[] = []
  if(products.length > 0){
    
      products.map((product) => {
      if(!sexArray.includes(product.sex)){
         sexArray.push(product.sex) 
      }
    })
  }

  return (
    <>
      <div className={style.screen}>
        <Header />
        <HeroCarousel />
        <ListProducts productsArray={products} title={"Todos los productos"} customClass='containerMainScreen'/>
        {modalAddProduct && (
          <div className={style.modalBackdrop}>
            <AddProductModal />
          </div>
        )}

        <div className={style.pagination}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPaginaActual(i)}
              style={{
                margin: "4px",
                padding: "6px 10px",
                fontWeight: i === paginaActual ? "bold" : "normal",
                backgroundColor: i === paginaActual ? "blue" : "black",
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Filter modal */}

        {visible && <FilterModal sexArray={sexArray}/>}
        <Footer />
      </div>
    </>
  );
};
