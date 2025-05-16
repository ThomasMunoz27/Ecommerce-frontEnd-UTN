import { useEffect, useState } from "react"
import { useStoreUsers } from "../../../store/useStoreUsers"
import { Input } from "../Input/Input"
import { ICountry } from "../../../types/ICountry"
import { getAllCountries } from "../../../cruds/crudCountry"
import { IProvince } from "../../../types/IProvince"
import { getProvincesByCountryId } from "../../../cruds/crudProvince"



export const FormCheckout = () => {

    const {user} = useStoreUsers()
    const [countries, setCountries] = useState<ICountry[]>([])
    const [provinces, setProvinces] = useState<IProvince[]>([])
    const [selectedCountry, setSelectedCountry] = useState<ICountry>()
    const [selectedProvince, setSelectedProvince] = useState<IProvince>()
    const handleSelectCountry = (e: React.ChangeEvent<HTMLSelectElement>) => {
	const country = countries.find(country => country.name === e.target.value)
	if (country) {
		setSelectedCountry(country)
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

    
    const initalValues = {
        name : user?.name || "",
        email : user?.email || "",
        dni: user?.dni || "",
        locality: user?.adress.locality.name ||"",
        province: user?.adress.locality.province.name ||"",
        country: user?.adress.locality.province.country.name || "",
        street: user?.adress.street || "",
        cp: user?.adress.cp || ""
    }
    const [formValues, setFormValues] = useState(initalValues)
    const [formErrors, setFormErrors] = useState<Record<string, string>>({})
    
    
    useEffect(() => {
        const firstGetAllCountries = async () => {
            const fetchCountries = await getAllCountries()
            setCountries(fetchCountries ?? [])
        }
        firstGetAllCountries()
    },[])

    useEffect(() => {
	const firstGetProvincesByCountry = async () => {
		if (!selectedCountry?.id) return // Evita el request si no hay país seleccionado

		const fetchProvinces = await getProvincesByCountryId(String(selectedCountry.id))
		setProvinces(fetchProvinces ?? [])
	}

	firstGetProvincesByCountry()
}, [selectedCountry])


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({...formValues, [e.target.name] : e.target.value})
        setFormErrors({...formErrors, [e.target.name] : ""})
    }


  return (
    <>
        <div>
            <form action="">
                <div>
                    <h3>Contacto</h3>
                    <Input type="email" label="Email" value={formValues.email} name="email" handleChange={handleChange} error={formErrors.email}/>

                </div>
                <div>
                    <h3>Direccion</h3>
                    <h4>Direcion de envío</h4>

                    <Input type="text" label="Nombre" value={formValues.name} name="name" handleChange={handleChange} error={formErrors.name}></Input>

                    <select name="pais" id="" value={formValues.country} onChange={handleSelectCountry} >
                        <option value="">Selecciona un País</option>

                        {Array.from(countries).map(country => <option key={country.id} value={country.name}>{country.name}</option>)}
                    </select>


                    <select name="provincia" id="" value={formValues.province} onChange={handleSelectProvince} disabled={!selectedCountry}>
                        <option value="">Selecciona una Provincia</option>

                        {Array.from(provinces).map(province => <option key={province.id} value={province.name}>{province.name}</option>)}
                    </select>

                    

                    <Input type="text" label="Localidad" value={formValues.locality} name="locality" handleChange={handleChange} error={formErrors.locality}/>

                    <Input type="text" label="cp" value={formValues.cp} name="cp" handleChange={handleChange} error={formErrors.cp}></Input>

                    <Input type="text" label="Calle" value={formValues.street} name="street" handleChange={handleChange} error={formErrors.street}/>
                </div>


            </form>
        </div>
    </>
  )
}
