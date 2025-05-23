import { useEffect, useState } from "react"
import { useStoreUsers } from "../../../store/useStoreUsers"
import { Input } from "../Input/Input"
import { ICountry } from "../../../types/ICountry"
import { getAllCountries } from "../../../cruds/crudCountry"
import { IProvince } from "../../../types/IProvince"
import { getProvincesByCountryId } from "../../../cruds/crudProvince"
import { ILocality } from "../../../types/ILocality"
import { getLocalitiesByProvinceId } from "../../../cruds/crudLocality"
import { formCheckoutSchema } from "../../../yupSchemas/formCheckoutSchema"
import styles from "./FormCheckout.module.css"
import { useStoreCheckout } from "../../../store/useStoreCheckout"


export const FormCheckout = () => {

    const {user} = useStoreUsers()
    const [countries, setCountries] = useState<ICountry[]>([])
    const [provinces, setProvinces] = useState<IProvince[]>([])
    const [localities, setLocalities] = useState<ILocality[]>([])
    const [selectedCountry, setSelectedCountry] = useState<ICountry>()
    const [selectedProvince, setSelectedProvince] = useState<IProvince>()
    const {formSumbited ,setFormSumbited, setValidFormSumbited} = useStoreCheckout()


    const handleSelectCountry = (e: React.ChangeEvent<HTMLSelectElement>) => {
	const country = countries.find(country => country.name === e.target.value)
	if (country) {
		setSelectedCountry(country)
        setLocalities([])
		setProvinces([])
		setFormValues({
			...formValues,
			country: country.name,
		})
	}
}

    const handleSelectProvince = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const province = provinces.find(province => province.name === e.target.value)
        if (province) {
            setSelectedProvince(province)
            setFormValues({
                ...formValues,
                province: province.name,
            })
        }
    }

    const handleSelectLocality = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const locality = localities.find(locality => locality.name === e.target.value)
        if(locality){
            setFormValues({
                ...formValues,
                locality: locality.name
            })
        }
    }
    
    const initalValues = {
        name : user?.name || formSumbited?.name || "",
        lastName: user?.lastname || formSumbited?.lastName || "",
        email : user?.email || formSumbited?.email || "",
        dni: user?.dni || formSumbited?.dni || "",
        locality: user?.adress.locality.name || formSumbited?.locality ||"",
        province: user?.adress.locality.province.name || formSumbited?.province ||"",
        country: user?.adress.locality.province.country.name || formSumbited?.country || "",
        street: user?.adress.street || formSumbited?.street || "",
        cp: formSumbited?.cp ||String(user?.adress.cp ?? "") || "",
        phoneNumber: formSumbited?.phoneNumber || ""
    }
    const [formValues, setFormValues] = useState(initalValues)
    const [formErrors, setFormErrors] = useState<Record<string, string>>({})
    
    //cargar provincias al inicio
    useEffect(() => {
        const firstGetAllCountries = async () => {
            const fetchCountries = await getAllCountries()
            setCountries(fetchCountries ?? [])
        }
        firstGetAllCountries()
    },[])

// Sincronizar selectedCountry al volver de "Editar"
	useEffect(() => {
		if (!formValues.country || countries.length === 0) return

		const foundCountry = countries.find(c => c.name === formValues.country)
		if (foundCountry) {
			setSelectedCountry(foundCountry)
		}
	}, [formValues.country, countries])

    // Cargar provincias cuando cambia el país
    useEffect(() => {
	const firstGetProvincesByCountry = async () => {
		if (!selectedCountry?.id) return // Evita el request si no hay país seleccionado

		const fetchProvinces = await getProvincesByCountryId(String(selectedCountry.id))
		setProvinces(fetchProvinces ?? [])
	}

	firstGetProvincesByCountry()
}, [selectedCountry])

    // Sincronizar selectedProvince al volver de "Editar"
	useEffect(() => {
		if (!formValues.province || provinces.length === 0) return

		const foundProvince = provinces.find(p => p.name === formValues.province)
		if (foundProvince) {
			setSelectedProvince(foundProvince)
		}
	}, [formValues.province, provinces])

    
    // Cargar localidades cuando cambia la provincia
    useEffect(() => {
        if(!selectedProvince?.id) return // Evita el request si no hay provincia seleccionada

        const fetchLocalities = async () => {
            const fetchLocalities = await getLocalitiesByProvinceId(String(selectedProvince.id))
            setLocalities(fetchLocalities ?? [])
        }

        fetchLocalities()
    }, [selectedProvince])


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({...formValues, [e.target.name] : e.target.value})
        setFormErrors({...formErrors, [e.target.name] : ""})
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
	e.preventDefault()
	try {
		await formCheckoutSchema.validate(formValues, { abortEarly: false })
		console.log("Formulario válido", formValues)
		// Acá podés enviar los datos al servidor
        setFormSumbited(formValues)
        setValidFormSumbited(true)
	} catch (err: any) {
		const errors: Record<string, string> = {}
		err.inner.forEach((validationError: any) => {
			errors[validationError.path] = validationError.message
		})
		setFormErrors(errors)
	}
}


  return (
    <>
        
            <form action="" onSubmit={handleSubmit} className={styles.formContainer}>
                <div className={styles.contactContainer}>
                    <h3>Contacto</h3>
                    <Input type="text" label="Email" value={formValues.email} name="email" handleChange={handleChange} error={formErrors.email}/>
                    <Input type="text" label="Nombre" value={formValues.name} name="name" handleChange={handleChange} error={formErrors.name}></Input>
                    <Input type="text" label="Apellido" value={formValues.lastName} name="lastName" handleChange={handleChange} error={formErrors.lastName}></Input>

                </div>
                <div className={styles.directionContainer}>
                    <h3>Direccion</h3>
                    <h4>Direcion de envío</h4>


                    <select name="pais" id="" value={formValues.country} onChange={handleSelectCountry} >
                        <option value="">Selecciona un País</option>

                        {Array.from(countries).map(country => <option key={country.id} value={country.name}>{country.name}</option>)}
                    </select>
                    {formErrors.country && <p className={styles.errorMessage}>{formErrors.country}</p>}


                    <select name="provincia" id="" value={formValues.province} onChange={handleSelectProvince} disabled={!selectedCountry}>
                        <option value="">Selecciona una Provincia</option>

                        {Array.from(provinces).map(province => <option key={province.id} value={province.name}>{province.name}</option>)}
                    </select>
                    {formErrors.province && <p className={styles.errorMessage}>{formErrors.province}</p>}

                    
                    <select name="localidad" id="" value={formValues.locality} onChange={handleSelectLocality} disabled={!selectedProvince}>
                        <option value="">Selecciona una Localidad</option>
                        {Array.from(localities).map(locality => <option key={locality.id} value={locality.name}>{locality.name}</option>)}
                    </select>
                    {formErrors.locality && <p className={styles.errorMessage}>{formErrors.locality}</p>}

                    <Input type="text" label="cp" value={formValues.cp} name="cp" handleChange={handleChange} error={formErrors.cp}></Input>

                    <Input type="text" label="Calle" value={formValues.street} name="street" handleChange={handleChange} error={formErrors.street}/>

                    <Input type="text" label="DNI" value={formValues.dni} name="dni" handleChange={handleChange} error={formErrors.dni}></Input>

                    <Input type="text" label="Telefono" value={formValues.phoneNumber} name="phoneNumber" handleChange={handleChange} error={formErrors.phoneNumber}></Input>
                </div>

                <button type="submit" className={styles.buttonConfirm}>Confirmar <img src="src\assets\arrow_right.svg" alt="flecha" /></button>
            </form>
        
    </>
  )
}
