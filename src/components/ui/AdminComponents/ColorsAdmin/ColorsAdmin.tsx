import { useEffect, useState } from 'react'
import styles from './ColorsAdmin.module.css'
import { IColor } from '../../../../types/IColor'
import { deleteColor } from '../../../../cruds/crudColor'
import { useStoreModal } from '../../../../store/useStoreModal'
import { AdminColor } from '../../Modals/AdminColor/AdminColor'
import { useStoreColor } from '../../../../store/useStoreColor'
import { IProduct } from '../../../../types/IProduct'
import { getAllProducts } from '../../../../cruds/crudProduct'
import { errorAlert } from '../../../../utils/errorAlert'
import { succesAlert } from '../../../../utils/succesAlert'

export const ColorsAdmin = () => {

    const {modalAdminColor, openModalAdminColor} = useStoreModal()
    const [products, setProducts] = useState<IProduct[]>()
    
    const {colors, fetchColors, setActivecolor} = useStoreColor()

    useEffect(() => {
        const getProducts = async() => {
            const productsFetched = await getAllProducts()
            setProducts(productsFetched)
        }
        getProducts()
        fetchColors()
    },[])


    const handleDelete = async(colorId : string) => {

        const colorInProduct = products?.some(products => 
            products.colors.some(color => color.id === Number(colorId))
        )

        if(colorInProduct){
            errorAlert('Error','El color se encuentra asignado a un producto')
            return
        }

        try {
            await deleteColor(colorId)
            succesAlert('Eliminado','Se elimino el color exitosamente')
            fetchColors()  // Actualizo el estado
        } catch (error : any) {
            errorAlert('Error','Ocurrio un error al eliminar un color')
            console.log(error.message);
            
        }
    }

    const handleEdit = (color : IColor) => {
        openModalAdminColor(2)
        setActivecolor(color)
    }

    return (
        <div className={styles.containerPrincipal}>
            <div className={styles.containerTitleAndButton}>
                <div className={styles.containerTitle}>
                    <h1>Gestión de Colores</h1>
                </div>
                <div className={styles.containerButtons}>
                    <button onClick={() => openModalAdminColor(1)}>
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
                        <td>{color.value.toUpperCase()}</td>
                        
                        
                        <td>
                            <div className={styles.actionButtons}>
                                <button onClick={() => handleEdit(color)}>Editar</button>
                                <button onClick={() => handleDelete(String(color.id))}>Eliminar</button>
                            </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {modalAdminColor.type && <div className={styles.modalBackdrop}> <AdminColor/></div>}
        </div>
    )
}