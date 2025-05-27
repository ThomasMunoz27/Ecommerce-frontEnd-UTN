import { useStoreFilterModal } from '../../../../store/useStoreFilterModal';
import style from './FilterModal.module.css'
export const FilterModal = () => {

    const {toggleVisible} = useStoreFilterModal()

  return (
    <aside className={style.modal}>
        <header >
            Filtrar <a>Borrar todo</a> <button onClick={toggleVisible}>X</button>
        </header>
        <div>
            <div className={style.filterSection}>
                <div className={style.sectionHandler}>
                ORDENAR POR   <button>V</button>
                </div>
                <div className={style.sectionDropdown}>
                    <p>PRECIO (DE MENOR A MAYOR)</p>
                    <p>PRECIO (DE MAYOR A MENOR)</p>
                </div>
            </div>
            <div className={style.filterSection}>
                <div className={style.sectionHandler}>
                SEXO   <button>V</button>
                </div>
                <div className={style.sectionDropdown}>
                    <p>Hombre</p>
                    <p>Mujer</p>
                    <p>Niños</p>
                </div>
            </div>
            <div className={style.filterSection}>
                <div className={style.sectionHandler}>
                COLOR   <button>V</button>
                </div>
                <div className={style.sectionDropdown}>
                    <p>COLOR 1</p>
                    <p>Color 3</p>
                    <p>Color 4</p>
                </div>
            </div>
        </div>
    </aside>
  );
};