import { FC, useEffect } from 'react';
import { useStoreColor } from '../../../../store/useStoreColor';
import { useStoreFilterModal } from '../../../../store/useStoreFilterModal';
import style from './FilterModal.module.css'

interface FilterModal {
    sexArray  : string[]
}

export const FilterModal: FC<FilterModal> = ({sexArray}) => {

    // State`s toggler`s

    const {toggleVisible, toggleOrderBy, toggleSex, toggleColor, toggleAsc, toggleDesc, orderAsc, orderDesc, activeSex, toggleActiveSex} = useStoreFilterModal()

    // State`s

    const {orderByDropped , sexDropped, colorDropped, toggleActiveColors, activeColors, clearFilters} = useStoreFilterModal()

    const {colors, fetchColors} = useStoreColor()
    
    useEffect(() => {
        fetchColors()
        console.log(activeColors)
    }, [activeColors])



  return (
    <aside className={style.modal}>
        <div className={style.modalContainer}>
            
        <header className={`${style.sectionDefault} ${style.header}`}>
            Filtrar <a className={style.deleteAll} onClick={clearFilters}>Borrar filtros</a> <button onClick={toggleVisible}>X</button>
        </header>
        <div>
            <div className={`${style.sectionDefault} ${style.filterSection}`}>
                <div className={`${style.sectionDefault} ${style.sectionHandler}`} onClick={toggleOrderBy}>
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
                        <p onClick={toggleAsc} className={orderAsc ? style.active : ''}>PRECIO (DE MENOR A MAYOR)</p>
                        <p onClick={toggleDesc} className={orderDesc ? style.active : ''}>PRECIO (DE MAYOR A MENOR)</p>
                        </div>
                    </div>
                    }
                    
            </div>
            <div className={`${style.sectionDefault} ${style.filterSection}`}>
                <div className={`${style.sectionDefault} ${style.sectionHandler}`} onClick={toggleSex}>
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
                       {sexArray.map((sex) =>  (
                         <div className={style.selectorContainer}>
                        <input type='checkbox' checked={activeSex.some((insideSex) => insideSex == sex )} onChange={(e) => {toggleActiveSex(sex, e.target.checked)
                        }}></input><p>{sex}</p>
                        </div>
                       ))}
                    </div>
               }
            </div>
            <div className={`${style.sectionDefault} ${style.filterSection}`}>
                <div className={`${style.sectionDefault} ${style.sectionHandler}`} onClick={toggleColor}>
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
                        {colors.map((color) =>  (
                              <div className={style.selectorContainer}>
                              <input type='checkbox' key={color.id} checked={activeColors.some((activeColor) => activeColor.id == color.id)} onChange={(e) => toggleActiveColors(color, e.target.checked)}></input><span style={{backgroundColor:color.value, width: '50px'}}></span>
                              </div>
                        ))}
                    </div>
                }
            </div>
        </div>
        </div>
    </aside>
  );
};