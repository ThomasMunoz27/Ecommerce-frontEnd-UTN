import { goToPay } from '../../../cruds/payActions'
import { useStoreCart } from '../../../store/useStoreCart'
import { useStoreCheckout } from '../../../store/useStoreCheckout'
import { Wallet, initMercadoPago } from '@mercadopago/sdk-react'
import styles from './FormSended.module.css'
import { useState } from 'react'
import { IBill } from '../../../types/IBIll'
import { useStoreUsers } from '../../../store/useStoreUsers'
import { IBIllDetail } from '../../../types/IBillDetail'
import { postBill } from '../../../cruds/crudBill'



export const FormSended = () => {

    initMercadoPago('APP_USR-5fc00859-454e-4cd6-a555-792ed86175c2', { locale: 'es-AR' });

    const{formSumbited, setValidFormSumbited} = useStoreCheckout()
    const {user} = useStoreUsers()
    const {productsInCart} = useStoreCart()
    const totalDiscount = productsInCart.reduce((sum, productInCart) => sum + (productInCart.prices.discount 
            ? productInCart.prices.discount.promotionalPrice
            : 0) * productInCart.quantity, 0)
    const {validFormSumbited} = useStoreCheckout()
    

    const[preferenceIdMp, setPreferenceIdMp] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    const handleEditForm = () => {
        setValidFormSumbited(false)
    }
    const handleGoToPay = async ()=> {
        try{
            setIsLoading(true)
            if(!validFormSumbited) return
            const mappedProducts = productsInCart.map(product => ({
		    id: product.id,
		    name: product.name,
		    imageUrl: product.image?.url,
		    price: (product.prices?.discount 
                ? product.prices.salePrice - product.prices.discount.promotionalPrice 
                : product.prices.salePrice ) * 1.21,
		    quantity: product.quantity,
		    category: product.category?.[0].name,
	        }));

	const mpPreferenceId = await goToPay(mappedProducts);
    console.log(productsInCart)
    setPreferenceIdMp(mpPreferenceId)

    
    const billDetails: IBIllDetail[] = productsInCart.map(productInCart => ({
	product: productInCart,
	quantity: productInCart.quantity,
	unitPrice: (productInCart.prices.discount 
        ? productInCart.prices.salePrice - productInCart.prices.discount.promotionalPrice 
        :productInCart.prices.salePrice) * 1.21,
	subtotal: ((productInCart.prices.discount 
        ? productInCart.prices.salePrice - productInCart.prices.discount.promotionalPrice 
        :productInCart.prices.salePrice) * 1.21) * productInCart.quantity,
    discount: productInCart.prices.discount?.promotionalPrice
}));
    //Generar los datos de la factura
    const billData: IBill = {
        total: productsInCart.reduce((sum, productInCart) => sum + ((productInCart.prices.discount 
            ? productInCart.prices.salePrice - productInCart.prices.discount.promotionalPrice
            : productInCart.prices.salePrice) * 1.21) * productInCart.quantity, 0),
        datePurchase: new Date().toISOString().split("T")[0],
        user: user, 
        totalDiscount: totalDiscount,

        buyerName: formSumbited?.name,
        buyerDni: formSumbited?.dni,
        buyerAddress: `${formSumbited?.country}, ${formSumbited?.province}, ${formSumbited?.locality}, ${formSumbited?.street}, CP:${formSumbited?.cp}`,
        details: billDetails,
        confirmed: false,
        preferenceId: mpPreferenceId
    }

    await postBill(billData)
        }catch(err){
            console.log(err)
        }finally{
            setIsLoading(false)
        }
        
    
    
  }

  return (
    <>
        <div className={styles.dataContainer}>
            <div className={styles.contactContainer}>
                    <div className={styles.contactHeader}>
                        <h3>Contacto</h3>
                        <p onClick={handleEditForm} className={styles.editForm}>Editar</p>

                    </div>
                    <p className={styles.dataSended}>{formSumbited?.email}</p>
                    <p className={styles.dataSended}>{formSumbited?.name}</p>
                    <p className={styles.dataSended}>{formSumbited?.lastName}</p>

                </div>
                <div className={styles.directionContainer}>
                    <div className={styles.contactHeader}>
                        <h3>Direccion</h3>
                        <p onClick={handleEditForm} className={styles.editForm}>Editar</p>
                    </div>
                    <h4>Direcion de envío</h4>

                    <p className={styles.dataSended}>{formSumbited?.country}</p>
                    <p className={styles.dataSended}>{formSumbited?.province}</p>
                    <p className={styles.dataSended}>{formSumbited?.locality}</p>
                    <p className={styles.dataSended}>{formSumbited?.street}</p>
                    <p className={styles.dataSended}>{formSumbited?.cp}</p>
                    <p className={styles.dataSended}>{formSumbited?.phoneNumber}</p>
                    <p className={styles.dataSended}>{formSumbited?.dni}</p>
                
                </div>

                <div className={styles.buttonContainer}>
                    {!preferenceIdMp 
                    ?(<button className={styles.payButton} disabled={isLoading} onClick={handleGoToPay}>
                        {isLoading ? (
				<span className="flex items-center gap-2">
					<span className="animate-spin border-2 border-t-transparent border-white rounded-full w-4 h-4" />
					Cargando...
				</span>
            ) : (
                'Obetener Link de Pago'
            )}


                    </button>)
                    :(<Wallet initialization={{ preferenceId: preferenceIdMp }}
                    customization={{
                        theme: 'dark'
                    }}/>)
                }
                    
                    
                </div>
        </div>
    
    
    </>
  )
}
