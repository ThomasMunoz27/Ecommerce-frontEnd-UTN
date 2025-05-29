import { useStoreFilterModal } from '../../../../store/useStoreFilterModal';
import style from './FilterModal.module.css'
export const FilterModal = () => {

    // State`s toggler`s

    const {toggleVisible, toggleOrderBy, toggleSex, toggleColor} = useStoreFilterModal()

    // State`s

    const {orderByDropped , sexDropped, colorDropped} = useStoreFilterModal()

  return (
    <aside className={style.modal}>
        <div className={style.modalContainer}>
            
        <header className={`${style.sectionDefault} ${style.header}`}>
            Filtrar <a>Borrar todo</a> <button onClick={toggleVisible}>X</button>
        </header>
        <div>
            <div className={`${style.sectionDefault} ${style.filterSection}`}>
                <div className={`${style.sectionDefault} ${style.sectionHandler}`}>
                <p>ORDENAR POR</p>  <button onClick={toggleOrderBy}>{
                orderByDropped 
                 ?
                 <img src="./icons/dropup.svg"/>
                 :
                 <img src="./icons/dropdown.svg"/>
                 }</button>
                </div>
                    {orderByDropped && 
                    <div className={`${style.sectionDefault} ${style.sectionDropdown}`}>
                        <div className={style.orderBy}>
                        <p>PRECIO (DE MENOR A MAYOR)</p>
                        <p>PRECIO (DE MAYOR A MENOR)</p>
                        </div>
                    </div>
                    }
                    
            </div>
            <div className={`${style.sectionDefault} ${style.filterSection}`}>
                <div className={`${style.sectionDefault} ${style.sectionHandler}`}>
                <p>SEXO</p>  <button onClick={toggleSex}>{
                sexDropped 
                 ?
                 <img src="./icons/dropup.svg"/>
                 :
                 <img src="./icons/dropdown.svg"/>
                 }</button>
                </div>
               {sexDropped && 
                    <div className={`${style.sectionDefault} ${style.sectionDropdown}`}>
                        <div className={style.selectorContainer}>
                        <input type='checkbox'></input><p>HOMBRE</p>
                        </div>
                        <div className={style.selectorContainer}>
                        <input type='checkbox'></input><p>MUJER</p>
                        </div>
                        <div className={style.selectorContainer}>
                        <input type='checkbox'></input><p>NIÑOS</p>
                        </div>
                    </div>
               }
            </div>
            <div className={`${style.sectionDefault} ${style.filterSection}`}>
                <div className={`${style.sectionDefault} ${style.sectionHandler}`}>
                <p>COLOR</p>  <button onClick={toggleColor}>{
                colorDropped 
                 ?
                 <img src="./icons/dropup.svg"/>
                 :
                 <img src="./icons/dropdown.svg"/>
                 }</button>
                </div>
                {colorDropped &&
                    <div className={`${style.sectionDefault} ${style.sectionDropdown}`}>
                        <div className={style.selectorContainer}>
                        <input type='checkbox'></input><p>COLOR 1</p>
                        </div>
                        <div className={style.selectorContainer}>
                        <input type='checkbox'></input><p>COLOR 2</p>
                        </div>
                        <div className={style.selectorContainer}>
                        <input type='checkbox'></input><p>COLOR 3</p>
                        </div>
                    </div>
                }
            </div>
        </div>
        </div>
    </aside>
  );
};