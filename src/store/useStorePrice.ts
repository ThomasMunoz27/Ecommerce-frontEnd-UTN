import { create } from "zustand";
import { IPrice } from "../types/IPrice";
import { getAllPrices } from "../cruds/crudPrices";

interface IStorePrice{
    prices: IPrice[],
    activePrice: IPrice | null,
    fetchPrice : () => Promise<void>

    setPrices: (incomingPrices:IPrice[]) => void,
    setActivePrice: (incomingPrice:IPrice) => void
}

export const useStorePrice = create<IStorePrice>((set) => ({

    prices: [],
    activePrice: null,


    setPrices: (incomingPrices) => set({prices: incomingPrices}),

    setActivePrice: (incomingPrice) => set({activePrice: incomingPrice}),

    fetchPrice: async() => {
        const pricesFetched = await getAllPrices()
        set ({prices : pricesFetched})
    }
}))