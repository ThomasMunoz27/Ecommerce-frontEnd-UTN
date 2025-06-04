import { FC, useEffect, useState } from 'react'
import styles from './SubAdminPrice.module.css'
import { useStoreModal } from '../../../../store/useStoreModal'
import useStoreProduct from '../../../../store/useStoreProduct'
import { getAllPrices } from '../../../../cruds/crudPrices'
import { IPrice } from '../../../../types/IPrice'
import { succesAlert } from '../../../../utils/succesAlert'
import { errorAlert } from '../../../../utils/errorAlert'
import { IProduct } from '../../../../types/IProduct'
import { getAllProducts } from '../../../../cruds/crudProduct'

interface ISubAdminPrice {
    product?: IProduct
    setProduct?: React.Dispatch<React.SetStateAction<IProduct>>
}

export const SubAdminPrice: FC<ISubAdminPrice> = ({ product, setProduct }) => {
    const { modalAdminSubPrice, closeAdminSubPrice } = useStoreModal()
    const { activeProduct, setActiveProduct } = useStoreProduct()

    const [prices, setPrices] = useState<IPrice[]>([])
    const [products, setProducts] = useState<IProduct[]>() // Todos los productos de la bd
    const [selectedPrice, setSelectedPrice] = useState<IPrice | null>(null)

    useEffect(() => {
        const getPrices = async () => {
            const pricesFetched = await getAllPrices()
            const productsFetched = await getAllProducts() // Llamo todos los productos
            setPrices(pricesFetched)
            setProducts(productsFetched)

            if (modalAdminSubPrice.option === 2 && activeProduct?.prices) {
                const found = pricesFetched.find(p => p.id === activeProduct.prices.id)
                setSelectedPrice(found || null)
            }
        }

        getPrices()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const priceId = Number(e.target.value)
        const found = prices.find(p => p.id === priceId)
        setSelectedPrice(found || null)
    }

    const handleAddPrice = (e: React.FormEvent) => {
        e.preventDefault()

        const existingPrice = products?.find((product) => product.prices.id === selectedPrice?.id)

        if (existingPrice){
            errorAlert('Error', 'Este precio ya esta asignado a un producto')
            closeAdminSubPrice()
            return
        }

        try {
            if (product && setProduct && selectedPrice) {
                setProduct(prev => ({
                    ...prev,
                    prices: selectedPrice
                }))
                succesAlert('Agregado', 'Se agregó el precio exitosamente')
                closeAdminSubPrice()
            } else {
                errorAlert('Error', 'Debe seleccionar un precio')
            }
        } catch (error: any) {
            errorAlert('Error', 'No se pudo agregar el precio')
            console.log(error.message)
        }
    }

    const handleEditPrice = (e: React.FormEvent) => {
        e.preventDefault()

        if (!activeProduct || !selectedPrice) {
            errorAlert('Error', 'Debe seleccionar un precio')
            return
        }

        try {
            const updatedActiveProduct = { ...activeProduct, prices: selectedPrice }
            setActiveProduct(updatedActiveProduct)
            succesAlert('Actualizado', 'Se cambió el precio')
            closeAdminSubPrice()
        } catch (error: any) {
            errorAlert('Error', 'No se pudo actualizar el precio')
            console.log(error.message)
        }
    }

    const renderSelect = () => (
        <select
            name="prices"
            value={selectedPrice?.id ?? ''}
            onChange={handleChange}
        >
            <option value="">Sin Selección</option>
            {prices.map(price => (
                <option key={price.id} value={price.id}>
                    Id:{price.id}, Precio Venta:{price.salePrice}, Precio Compra:{price.purchasePrice}
                </option>
            ))}
        </select>
    )

    return (
        <div className={styles.containerPrincipal}>
            <div className={styles.containerTitle}>
                <h1>Manejo de precios</h1>
            </div>
            <form onSubmit={modalAdminSubPrice.option === 1 ? handleAddPrice : handleEditPrice}>
                <div className={styles.containerAddPrice}>
                    <h3>{modalAdminSubPrice.option === 1 ? 'Agregar Precio' : 'Editar Precio'}</h3>
                    {renderSelect()}
                </div>
                <div className={styles.containerButtons}>
                    <button type="button" onClick={closeAdminSubPrice}>Cancelar</button>
                    <button>Aceptar</button>
                </div>
            </form>
        </div>
    )
}
