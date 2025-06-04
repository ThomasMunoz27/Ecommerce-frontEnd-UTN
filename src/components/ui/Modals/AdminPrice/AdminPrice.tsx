import { useEffect, useState } from 'react'
import { useStoreModal } from '../../../../store/useStoreModal'
import { useStorePrice } from '../../../../store/useStorePrice'
import styles from './AdminPrice.module.css'
import { getAllDiscounts } from '../../../../cruds/crudDiscount'
import { IDiscount } from '../../../../types/IDiscount'
import { IPrice } from '../../../../types/IPrice'
import { postPrice, putPrice } from '../../../../cruds/crudPrices'
import { succesAlert } from '../../../../utils/succesAlert'
import { formPriceSchema } from '../../../../yupSchemas/formPriceSchema'

export const AdminPrice = () => {
    const {modalAdminPrice, closeModalAdminPrice} = useStoreModal()
    const [discounts, setDiscounts] = useState<IDiscount[]>()
    const {activePrice, fetchPrice} = useStorePrice()
    const [editPrice, setEditePrice] = useState<IPrice>(activePrice!)
    const [newPrice, setNewPrice] = useState<IPrice>({
        salePrice : 0,
        purchasePrice : 0,
        discount: null
    })
    const [formErrors, setFormErrors] = useState<Record<string, string>>({})


    useEffect(() => {
        const getDiscounts = async() => {
            const discountsFetched = await getAllDiscounts()
            setDiscounts(discountsFetched)
        }
        getDiscounts()
    },[])


    const handleAddDiscount = async(e : React.FormEvent) => {
        e.preventDefault()
        try {
            await formPriceSchema.validate(newPrice, {abortEarly: false})
            await postPrice(newPrice)
            succesAlert('Creado', 'Se creo el precio existosamente')
            fetchPrice()
            closeModalAdminPrice()
        } catch (error : any) {
            const errors: Record<string, string> = {}
            if (error.inner) {
			error.inner.forEach((validationError: any) => {
				errors[validationError.path] = validationError.message;
			});
		} else {
			errors.general = error.message;
		}
            setFormErrors(errors)
        }
    }

    const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target
        // Para descuento
        if (name == 'discount'){
            if(value === 'sin-descuento'){
                setNewPrice((prev) => ({
                    ...prev,
                    discount : null
                }))
            } else {
                const selectedDiscount = discounts?.find(d => d.id === Number(value)) || null // Busco el id del descuento
                setNewPrice((prev) => ({
                    ...prev,
                    discount : selectedDiscount
                }))
            }
        } else {
            setNewPrice((prev) => ({
                ...prev,
                [name] : Number(value)
            }))
        } 
    }

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (!activePrice?.id) {
            alert("No hay precio activo");
            return;
        }

        if (name === "discount") {
            if (value === "sin-descuento") {
                setEditePrice((prev) => ({
                ...prev,
                discount: null,
            }));
        } else {
            const selectedDiscount = discounts?.find((d) => d.id === Number(value)) || null;
            setEditePrice((prev) => ({
            ...prev,
            discount: selectedDiscount,
        }));
        }
    } else {
        setEditePrice((prev) => ({
            ...prev,
            [name]: Number(value),
            }));
        }
    };

    const handleEdit = async(e: React.FormEvent) => {
        e.preventDefault()
        try {
            await formPriceSchema.validate(editPrice, {abortEarly: false})

            await putPrice(editPrice)
            alert('Se actualizo el precio')
            fetchPrice()
            closeModalAdminPrice()
        } catch (error : any) {
            const errors: Record<string, string> = {}
            if (error.inner) {
			error.inner.forEach((validationError: any) => {
				errors[validationError.path] = validationError.message;
			});
		} else {
			errors.general = error.message;
		}
            setFormErrors(errors)
        }
    }

    if(modalAdminPrice.option === 1){
        return(
            <div className={styles.containerPrincipal}>
                <div className={styles.containerTitle}>
                    <h1>Agregar Precio</h1>
                </div>
                <form action="" onSubmit={handleAddDiscount}>
                    <div className={styles.containerPrices}>

                        <label htmlFor="">Precio de Compra</label>
                        <div className={styles.inputContainer}>
                            <input type="number" name='purchasePrice' onChange={handleChange}/>
                            {formErrors.purchasePrice && <p className={styles.errorMessage}>{formErrors.purchasePrice}</p>}
                        </div>

                        <label htmlFor="">Precio de Venta</label>
                        <div>

                        </div>
                        <div className={styles.inputContainer}>
                            <input type="number" name="salePrice" id="" onChange={handleChange}/>
                            {formErrors.salePrice && <p className={styles.errorMessage}>{formErrors.salePrice}</p>}
                        </div>
                        <label htmlFor="">Descuento</label>
                        <select name="discount" id="" onChange={handleChange}>
                            <option value="disable" disabled selected>Descuentos</option>
                            <option value="sin-descuento">Sin descuento</option>
                            {discounts?.map(discount => (
                                <option key={discount.id} value={discount.id}>{discount.name}</option>
                            ))}
                        </select>

                    </div>
                    <div className={styles.containerButtons}>
                        <button onClick={closeModalAdminPrice}>Cancelar</button>
                        <button type='submit'>Aceptar</button>
                    </div>
                </form>
            </div>
        )
    } else if(modalAdminPrice.option === 2) {
        
        return (
            <div className={styles.containerPrincipal}>
                <div className={styles.containerTitle}>
                    <h1>Editar Precio</h1>
                </div>
                <form action="" onSubmit={handleEdit}>
                    <div className={styles.containerPrices}>

                        <label htmlFor="">Precio de Compra</label>
                        <input type="number" name="purchasePrice" value={editPrice?.purchasePrice} onChange={handleEditChange}/>

                        <label htmlFor="">Precio de Venta</label>
                        <input type="number" name="salePrice" value={editPrice?.salePrice} id="" onChange={handleEditChange}/>

                        <label htmlFor="">Descuento</label>
                        <select name="discount" id="" value={editPrice.discount ? String(editPrice.discount.id) : "sin-descuento"} onChange={handleEditChange}>
                            <option value="disable" disabled selected>Descuentos</option>
                            <option value="sin-descuento">Sin descuento</option>
                            {discounts?.map(discount => (
                                <option key={discount.id} value={discount.id}>{discount.name}</option>
                            ))}
                        </select>

                    </div>
                    <div className={styles.containerButtons}>
                        <button onClick={closeModalAdminPrice}>Cancelar</button>
                        <button type='submit'>Aceptar</button>
                    </div>
                </form>
            </div>
        )
    }
}