import { useEffect, useState } from "react";
import { useStoreModal } from "../../../store/useStoreModal";

import { Footer } from "../../ui/footer/Footer";

import HeroCarousel from "../../ui/HeroCarousel/HeroCarousel";
import { ListProducts } from "../../ui/ListProducts/ListProducts";
import style from "./MainScreen.module.css";
import { IProduct } from "../../../types/IProduct";
import { getAllProducts, getAllProductsPaged } from "../../../cruds/crudProduct";
import { Header } from "../../ui/Headers/Header/Header";
import { AddProductModal } from "../../ui/Modals/AddProductModal/AddProductModal";

export const MainScreen = () => {
  const { modalAddProduct } = useStoreModal();

  const [products, setProducts] = useState<IProduct[]>([]);

  const [paginaActual, setPaginaActual] = useState(0);

  const [totalPages, setTotalPages] = useState(0);

  const { closeModalAddProduct } = useStoreModal();
  useEffect(() => {
    closeModalAddProduct();

    getPagedProducts();
  }, [paginaActual]);
  const getPagedProducts = async () => {
    const pagedProducts = await getAllProductsPaged(paginaActual, 10);

    setProducts(pagedProducts.content);

    setTotalPages(pagedProducts.totalPages);
  };

  return (
    <>
      <div className={style.screen}>
        <Header />

        <HeroCarousel />
        <ListProducts productsArray={products} title={"Todos los productos"} />
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
        <Footer />
      </div>
    </>
  );
};
