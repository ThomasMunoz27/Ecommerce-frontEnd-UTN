import { useEffect, useState } from 'react'
import styles from './ColorsAdmin.module.css'
import { IColor } from '../../../../types/IColor'
import { getAllColors } from '../../../../cruds/crudColor'

export const ColorsAdmin = () => {

    const [colors, setColors] = useState<IColor[]>()

    useEffect(() => {
        const getColors = async() => {
            const colorsFetched = await getAllColors()
            setColors(colorsFetched)
        }
        getColors()
    },[colors])

    return (
       <div className={styles.containerPrincipal}>
            <div className={styles.containerTitleAndButton}>
                <div className={styles.containerTitle}>
                    <h1>Gestión de Colores</h1>
                </div>
                <div className={styles.containerButtons}>
                    <button>
                        Añadir
                    </button>
                </div>
            </div>
        <div className={styles.colorsTable}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Color</th>
                        <th>Valor</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {colors?.map((color) => (
                    <tr key={color.id}>
                        <td>{color.id}</td>
                        <td>
                            <div style={{'backgroundColor' : `${color.value}`, 'width' : '100%', 'height' : '30px', 'borderRadius' : '5px'}}></div>
                        </td>
                        <td>{color.value}</td>
                        
                        
                        <td>
                            <div className={styles.actionButtons}>
                                <button >Editar</button>
                                <button >Eliminar</button>
                            </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    )
}