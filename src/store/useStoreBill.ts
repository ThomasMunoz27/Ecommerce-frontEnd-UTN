import { create } from "zustand";
import { IBill } from "../types/IBIll";
import { getAllBills } from "../cruds/crudBill";
import { persist } from "zustand/middleware";


interface IStoreBill {
    bills : IBill[],
    activeBill : IBill | null,
    setActiveBill: (bill : IBill) => void
    fetchBill : () => Promise<void>
}

export const useStoreBill = create<IStoreBill>()(persist((set, get) => ({
    bills : [],

    activeBill : null,

    setActiveBill : (bill : IBill) => set({activeBill : bill}),
    
    fetchBill : async() => {
        const billsFetched = await getAllBills()
        set ({bills : billsFetched})
    }
}),
		{
			name: "bill-storage", // clave en localStorage
			partialize: (state) => ({
				activeBill: state.activeBill,
			}), // solo persistimos la billActiva, no las funciones
		}
))
