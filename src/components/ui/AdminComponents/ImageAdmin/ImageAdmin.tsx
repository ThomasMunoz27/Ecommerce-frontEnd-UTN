import { useEffect, useState } from 'react'
import styles from './ImageAdmin.module.css'
import { getAllImages } from '../../../../cruds/crudImage'
import { IImage } from '../../../../types/IImage'


export const ImageAdmin = () => {

    const [images, setImages] = useState<IImage[]>()

    useEffect(() => {
        const getAImages = async() => {
            const imagesFetched = await getAllImages()
            setImages(imagesFetched)
        }
        getAImages()
    },[])


    return (
        <div className={styles.containerPrincipal}>
            <div className={styles.containerTitleAndButton}>
                <div className={styles.containerTitle}>
                    <h1>Gestión de Imagenes</h1>
                </div>
                <div className={styles.containerButtons}>
                    <button>
                        Añadir
                    </button>
                </div>
            </div>
            <div className={styles.imagesTable}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Url</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {images?.map(image => (
                    <tr key={image.id}>
                        <td>{image.id}</td>
                        <td>{image.url}</td>
        
                        <td>
                            <div className={styles.actionButtons}>
                                <button >Editar</button>
                                <button>Eliminar</button>
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