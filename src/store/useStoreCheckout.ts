import { create } from "zustand";

interface IFormValues {
	name: string | undefined
	email: string | undefined
	dni: string | undefined
	locality: string | undefined
	province: string | undefined
	country: string | undefined
	street: string | undefined
	cp: string | undefined
	phoneNumber: string | undefined
}

interface IStoreCheckout {
    formSumbited: IFormValues | null

    validFormSumbited: boolean

    setFormSumbited: (data: IFormValues) => void
	setValidFormSumbited: (value: boolean) => void
	resetForm: () => void
}

export const useStoreCheckout = create<IStoreCheckout>((set) => ({
    formSumbited: null,

    validFormSumbited: false,
    
    
    setFormSumbited: (data) => set({ formSumbited: data }),
	setValidFormSumbited: (value) => set({ validFormSumbited: value }),
	resetForm: () => set({ formSumbited: null, validFormSumbited: false }),


}))