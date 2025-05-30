import { FC, useEffect, useState } from 'react'
import styles from './SubAdminPrice.module.css'
import { useStoreModal } from '../../../../store/useStoreModal'
import useStoreProduct from '../../../../store/useStoreProduct'
import { ICreateProduct } from '../../../../types/ICreateProduct'
import { getAllPrices } from '../../../../cruds/crudPrices'
import { IPrice } from '../../../../types/IPrice'
import { succesAlert } from '../../../../utils/succesAlert'
import { errorAlert } from '../../../../utils/errorAlert'

interface ISubAdminPrice {
    product ? : ICreateProduct
    setProduct?: React.Dispatch<React.SetStateAction<ICreateProduct>>
}

export const SubAdminPrice : FC<ISubAdminPrice> = ({product, setProduct}) => {
    const {modalAdminSubPrice, closeAdminSubPrice} = useStoreModal()   
    const {activeProduct, setActiveProduct} = useStoreProduct()

    const [prices, setPrices] = useState<IPrice[]>()
    const [selectedPriceId, setSelectedPriceId] = useState<number | ''>('')



    useEffect(() => {
        const getPrices = async() => {
            const pricesFetched = await getAllPrices()
            setPrices(pricesFetched)
        }
        getPrices()
        setSelectedPriceId(activeProduct?.prices?.id ?? '')
    },[])


    // Manejo cambio del select
    const handleChange = (e : React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPriceId(Number(e.target.value))
        console.log(selectedPriceId);
        
    }

    const handleAddPrice = (e : React.FormEvent) => {
        e.preventDefault()
        try {
            if (product && setProduct && selectedPriceId !== '') {
                setProduct(prev => ({
                ...prev,
                pricesId: selectedPriceId
            }))
                succesAlert('Agregado', 'Se agrego el precio exitosamente')
                closeAdminSubPrice()
            } 
            errorAlert('Error', 'No se pudo agregar el precio')
        } catch (error : any) {
            errorAlert('Error', 'No se pudo agregar el precio')
            console.log(error.message);
            
        }
    }

    const handleEditPrice = (e : React.FormEvent) => {
        e.preventDefault()
        
        if (!activeProduct || selectedPriceId === ''){
            return
        }

        const selectedPrice = prices?.find(price => price.id === selectedPriceId)
        if (!selectedPrice) {
            return
        }

        try {
            const updatedActiveProduct = {...activeProduct, prices: selectedPrice}
            setActiveProduct(updatedActiveProduct)
            succesAlert('Actualizado', 'Se cambio el precio')
            closeAdminSubPrice()
        } catch (error : any) {
            errorAlert('Error', 'No se pudo actualizar el precio')
            console.log(error.message);
            
        }

    }

    if(modalAdminSubPrice.option === 1){


        return(
            <div className={styles.containerPrincipal}>
                <div className={styles.containerTitle}>
                    <h1>Manejo de precios</h1>
                </div>
                <form action="" onSubmit={handleAddPrice}>
                    <div className={styles.containerAddPrice}>
                        <h3>Agregar Precio</h3>
                        <select name="priceId" id="" onChange={handleChange}>
                            <option value="" >Sin Seleccion</option>
                            {prices?.map(price => (
                                <option key={price.id} value={price.id}> Id:{price.id} Precio Venta:{price.salePrice}, Precio Compra: {price.purchasePrice}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.containerButtons}>
                        <button type='button' onClick={closeAdminSubPrice}>Cancelar</button>
                        <button>Aceptar</button>
                    </div>
                </form>
            </div>
        )
    } else if(modalAdminSubPrice.option === 2){



        return (
            <div className={styles.containerPrincipal}>
                <div className={styles.containerTitle}>
                    <h1>Manejo de precios</h1>
                </div>
                <form action="" onSubmit={handleEditPrice}>
                    <div className={styles.containerAddPrice}>
                        <h3>Editar Precio</h3>

                        <select name="prices" value={selectedPriceId === '' ? '' : String(selectedPriceId)} id="" onChange={handleChange}>
                            <option value="">Sin Seleccion</option>
                            {prices?.map(price => (
                                <option key={price.id} value={String(price.id)} > 
                                    Id:{price.id}, Precio Venta:{price.salePrice}, Precio Compra: {price.purchasePrice}
                                </option>
                            ))}
                        </select>

                    </div>
                    <div className={styles.containerButtons}>
                        <button type='button' onClick={closeAdminSubPrice}>Cancelar</button>
                        <button>Aceptar</button>
                    </div>
                </form>
            </div>
        )
    }
}