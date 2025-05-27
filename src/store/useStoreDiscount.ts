import { create } from "zustand";
import { IDiscount } from "../types/IDiscount";

interface IStoreDiscount{
    discounts: IDiscount[],
    activeDiscount: IDiscount | null,

    setDiscounts: (incomingDiscounts: IDiscount[]) => void
    setActiveDiscount: (incomingDiscount: IDiscount) => void
}

export const useStoreDiscount = create<IStoreDiscount>((set) => ({
    
    discounts: [],
    activeDiscount: null,

    setDiscounts: (incomingDiscounts) => set({discounts: incomingDiscounts}),

    setActiveDiscount: (incomingDiscount) => set({activeDiscount: incomingDiscount})

}))