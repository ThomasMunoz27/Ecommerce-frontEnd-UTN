import { useEffect } from 'react'
import styles from './ImageAdmin.module.css'
import { deleteImage, getAllImages } from '../../../../cruds/crudImage'
import { useStoreImages } from '../../../../store/useStoreImages'
import { succesAlert } from '../../../../utils/succesAlert'
import { useStoreModal } from '../../../../store/useStoreModal'
import { AdminImage } from '../../Modals/AdminImage/AdminImage'
import { IImage } from '../../../../types/IImage'


export const ImageAdmin = () => {

    
    const {images, setImages, setActiveImage} = useStoreImages()
    const {modalAdminImage, openModalAdminImage} = useStoreModal()
    

    useEffect(() => {
        const getAImages = async() => {
            const imagesFetched = await getAllImages()
            setImages(imagesFetched)
        }
        getAImages()
    },[])

    const handleDelete = async(imageId : string) => {
        try {
            await deleteImage(imageId)
            succesAlert('Eliminado', 'Se elimino la imagen exitosamente')
        } catch (error : any) {
            console.log(error.message);
            
        }
    }

    const handleAddModal = () => {
        setActiveImage(null)
        openModalAdminImage()
    }

    const handleEditModal = (image : IImage) => {
        setActiveImage(image)
        openModalAdminImage()
    }

    return (
        <div className={styles.containerPrincipal}>
            <div className={styles.containerTitleAndButton}>
                <div className={styles.containerTitle}>
                    <h1>Gestión de Imagenes</h1>
                </div>
                <div className={styles.containerButtons}>
                    <button onClick={handleAddModal}>
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
                        <th>Imagen</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {images?.map(image => (
                    <tr key={image.id}>
                        <td>{image.id}</td>
                        <td >{image.url}</td>
                        <td>
                            <img src={image.url} alt=""  className={styles.images}/>
                        </td>
        
                        <td>
                            <div className={styles.actionButtons}>
                                <button onClick={() => handleEditModal(image)}>Editar</button>
                                <button onClick={() => handleDelete(String(image.id))}>Eliminar</button>
                            </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {modalAdminImage && <div className={styles.modalBackdrop}><AdminImage/></div>}
        </div>
    )
}