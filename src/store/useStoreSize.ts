import { create } from "zustand";
import { ISize } from "../types/ISize";


interface IStoreSize{
    sizes: ISize[]
    activeSize: ISize | null

    setSizes: (incomingSizes: ISize[]) => void
    setActiveSize: (incomingSize: ISize) => void

}

export const useStoreSize = create<IStoreSize>((set) => ({

    sizes: [],
    activeSize: null,

    setSizes: (incomingSizes) => set ({sizes: incomingSizes}),

    setActiveSize: (incomingSize) => set({activeSize: incomingSize})

}))