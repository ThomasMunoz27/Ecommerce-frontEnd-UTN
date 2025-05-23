import React, { FC, useEffect, useState } from 'react'
import { useStoreModal } from '../../../../store/useStoreModal'
import styles from './ModalPrice.module.css'
import { IPrice } from '../../../../types/IPrice'
import { IProduct } from '../../../../types/IProduct'


interface IModalPrice {
    product? : IProduct,
    onSavePrices : (prices : IPrice) => void
}


export const ModalPrice : FC<IModalPrice> = ({product, onSavePrices}) => {
    const {closeModalPrices} = useStoreModal()

    const [prices, setPrices] = useState<IPrice>({
        id : 0,
        purchasePrice : 0,
        salePrice : 0,
        discount : {
            id : 0,
            name : '',
                timeTo: '',
                dateTo: '',
                dateFrom: '',
                timeFrom: '',
                promotionalPrice: 0,
                discountDescription: ''

        }
    })

    // Inicializo los precios si el producto ya los tiene
    useEffect(() => {
        if (product?.prices){
            setPrices(product.prices)
        }else {
            // Estado para crear
            setPrices({
                id: 0,
                purchasePrice: 0,
                salePrice: 0,
                discount: {
                    id: 0,
                    name: '',
                    timeTo: '',
                    dateTo: '',
                    dateFrom: '',
                    timeFrom: '',
                    promotionalPrice: 0,
                    discountDescription: ''
                }
            })
        }
    },[product])

    const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target
        
        // Campos dentro del descuento
        if (name in prices.discount) {
            setPrices(prev => ({
                ...prev,
                discount: {
                    ...prev.discount,
                    [name] : name === 'promotionalPrice' ? Number(value) : value
                }
            }))
        }else{
            // Campos de precio de compra y de venta
            setPrices(prev => ({
                ...prev,
                [name] : Number(value)
            }))
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault()
        onSavePrices(prices)
        closeModalPrices()
    }

    return(
        <div className={styles.containerPrincipal}>
            
            <h1>Editar Precios</h1>
            
            <form action="" onSubmit={handleSubmit} className={styles.containerForm}>
                <div className={styles.containerPrices}>
                    <div className={styles.containerPricesColumn}>
                        <label htmlFor="">Precio Compra</label>
                        <input type="number" value={prices.purchasePrice || ''} name='purchasePrice' onChange={handleChange}/>
                    </div>

                    <div className={styles.containerPricesColumn}>
                        <label htmlFor="">Precio Venta</label>
                        <input type="number" value={prices.salePrice || ''} name="salePrice" id="" onChange={handleChange}/>
                    </div>
                </div>
                <hr />

                <div className={styles.containerDiscount}>
                    <h3>Descuento</h3>
                    <div className={styles.discountData}>

                        <div className={styles.discountColumn}>
                            <label htmlFor="">Nombre</label>
                            <input type="text" name="name" value={prices.discount.name || ''} id="" placeholder='Nombre' onChange={handleChange}/>
                            <label htmlFor="">Hora Desde</label>
                            <input type="text" name="timeTo" id="" value={prices.discount.timeTo || ''} placeholder='Hora desde ' onChange={handleChange}/>
                            <label htmlFor="">Hora Hasta</label>
                            <input type="text" name="timeFrom" id="" value={prices.discount.timeFrom || ''} placeholder='Hora hasta' onChange={handleChange}/>
                        </div>

                        <div className={styles.discountColumn}>
                            <label htmlFor="">Precio Promocional</label>
                            <input type="number" name="promotionalPrice" value={prices.discount.promotionalPrice || ''} id="" placeholder='Precio Promocional' onChange={handleChange}/>
                            <label htmlFor="">Fecha Desde</label>
                            <input type="date" name="dateTo" id="" value={prices.discount.dateTo || ''} placeholder='Fecha Desde' onChange={handleChange}/>
                            <label htmlFor="">Fecha Hasta</label>
                            <input type="date" name="dateFrom" id="" value={prices.discount.dateFrom || ''} placeholder='Fecha Hasta' onChange={handleChange}/>
                        </div>

                    </div>
                    <textarea name="discountDescription" id="" value={prices.discount.discountDescription || ''} placeholder='Descripcion' onChange={handleChange}></textarea>
                </div>
                <div className={styles.containerButtons}>
                    <button onClick={closeModalPrices}>Cancelar</button>
                    <button>Aceptar</button>
                </div>
            </form>
        </div>
    )
}