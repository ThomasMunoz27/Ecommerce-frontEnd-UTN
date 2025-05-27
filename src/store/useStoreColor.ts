import { create } from "zustand";
import { IColor } from "../types/IColor";

interface IStoreColor{
    colors : IColor[],
    activeColor: IColor | null

    setColors: (incomingColors: IColor[]) => void 
    setActivecolor: (incomingColor: IColor) => void
}

export const  useStoreColor = create<IStoreColor>((set) => ({

    colors: [],
    activeColor: null,


    setColors: (incomingColors) => set({colors: incomingColors}),

    setActivecolor: (incomingColor) => set({activeColor: incomingColor})
}))