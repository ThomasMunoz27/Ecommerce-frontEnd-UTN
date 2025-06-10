import { useEffect, useState } from 'react'
import { useStoreImages } from '../../../../store/useStoreImages'
import { useStoreModal } from '../../../../store/useStoreModal'
import styles from './AdminImage.module.css'
import { errorAlert } from '../../../../utils/errorAlert'
import { getAllImages, postImageToCloudinary, putImage, putImageToCloudinary } from '../../../../cruds/crudImage'
import { succesAlert } from '../../../../utils/succesAlert'
import { IImage } from '../../../../types/IImage'

export const AdminImage = () => {

    const {closeModalAdminImage} = useStoreModal()
    const {activeImage, fetchImages} = useStoreImages()
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null)
    const [images, setimages] = useState<IImage[]>()

    useEffect(() => {
        const getImages = async() => {
            const imagesFetched = await getAllImages()
            setimages(imagesFetched)
        } 
        getImages()
    },[])

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] // Obtengo el primer archivo 
        if (file ) {
            setSelectedFile(file) //Guardo el archivo
            const fileReader = new FileReader()
            fileReader.onload = () => {
                setPreview(fileReader.result as string) // Genro vista previa
            }
            fileReader.readAsDataURL(file) 
        }
    }

    const handleSubmit = async(e : React.FormEvent) => {
        e.preventDefault()

        const existingImage = images?.find((image) => image.url === preview)

        if (existingImage) {
            errorAlert('Error', 'Ya existe una imagen con esa url')
            closeModalAdminImage()
            return
        }

        try {
            if (activeImage && selectedFile) {
                closeModalAdminImage()
                await putImageToCloudinary(activeImage.id!,selectedFile)
                succesAlert('Editado', 'Se edito la imagen correctamente')
                fetchImages()
                
            } else {
                closeModalAdminImage()
                await postImageToCloudinary(selectedFile!)
                succesAlert('Creado', 'La imagen fue creada con exito')
                fetchImages()

            }
        } catch (error : any) {
            console.log(error.message);
            
            activeImage ? errorAlert('Error', 'No se pudo actualizar la imagen') : errorAlert('Error', 'No se pudo subir la imagen')
        }
    }

    return (
        <div className={styles.containerPrincipal}>
            <div className={styles.containerTitle}>
                <h1>Manejo de Imagenes</h1>
            </div>
            <form action="" onSubmit={handleSubmit}>
                <div className={styles.containerImage}> 

                    <h3>{activeImage ? 'Editar Imagen' : 'Crear Imagen'}</h3>
                    {preview && <img className={styles.image} src={preview} alt='Vista previa'/>}

                    {activeImage &&(
                        <img className={styles.image} src={activeImage.url} alt="Imagen actual" />
                    )}
                    <input type="file" onChange={handleChange}/>
                </div>

                <div className={styles.containerButtons}>
                    <button onClick={closeModalAdminImage}>Cancelar</button>
                    <button type='submit'>Aceptar</button>
                </div>
            </form>
        </div>
    )
}