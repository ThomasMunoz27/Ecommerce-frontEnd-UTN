import { create } from "zustand";
import { IPrice } from "../types/IPrice";

interface IStorePrice{
    prices: IPrice[],
    activePrice: IPrice | null,

    setPrices: (incomingPrices:IPrice[]) => void,
    setActivePrice: (incomingPrice:IPrice) => void
}

export const useStorePrice = create<IStorePrice>((set) => ({

    prices: [],
    activePrice: null,

    setPrices: (incomingPrices) => set({prices: incomingPrices}),

    setActivePrice: (incomingPrice) => set({activePrice: incomingPrice})
}))