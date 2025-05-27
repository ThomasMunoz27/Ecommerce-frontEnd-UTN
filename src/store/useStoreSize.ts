import { create } from "zustand";
import { ISize } from "../types/ISize";
import { getAllSizes } from "../cruds/crudSize";


interface IStoreSize{
    sizes: ISize[]
    activeSize: ISize | null
    fetchSize : () => Promise<void>

    setSizes: (incomingSizes: ISize[]) => void
    setActiveSize: (incomingSize: ISize) => void

}

export const useStoreSize = create<IStoreSize>((set) => ({

    sizes: [],
    activeSize: null,

    setSizes: (incomingSizes) => set ({sizes: incomingSizes}),

    setActiveSize: (incomingSize) => set({activeSize: incomingSize}),

    fetchSize : async () => {
        const sizesFetched = await getAllSizes()
        set({sizes : sizesFetched})
    }

}))