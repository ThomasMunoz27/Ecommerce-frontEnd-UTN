import { create } from "zustand";
import { IDiscount } from "../types/IDiscount";
import { getAllDiscounts } from "../cruds/crudDiscount";

interface IStoreDiscount{
    discounts: IDiscount[],
    activeDiscount: IDiscount | null,
    fetchDiscount : () => Promise<void>

    setDiscounts: (incomingDiscounts: IDiscount[]) => void
    setActiveDiscount: (incomingDiscount: IDiscount) => void
}

export const useStoreDiscount = create<IStoreDiscount>((set) => ({
    
    discounts: [],
    activeDiscount: null,

    setDiscounts: (incomingDiscounts) => set({discounts: incomingDiscounts}),

    setActiveDiscount: (incomingDiscount) => set({activeDiscount: incomingDiscount}),

    fetchDiscount : async () => {
        const discountsFetched = await getAllDiscounts()
        set({discounts : discountsFetched})
    }

}))