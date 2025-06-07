import { create } from "zustand";
import { IBill } from "../types/IBIll";
import { getAllBills } from "../cruds/crudBill";


interface IStoreBill {
    bills : IBill[],
    activeBill : IBill | null,
    setActiveBill: (bill : IBill) => void
    fetchBill : () => Promise<void>
}

export const useStoreBill = create<IStoreBill>((set) => ({
    bills : [],

    activeBill : null,

    setActiveBill : (bill : IBill) => set({activeBill : bill}),
    
    fetchBill : async() => {
        const billsFetched = await getAllBills()
        set ({bills : billsFetched})
    }
}))