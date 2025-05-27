import { create } from "zustand";
import { IColor } from "../types/IColor";
import { getAllColors } from "../cruds/crudColor";

interface IStoreColor{
    colors : IColor[],
    activeColor: IColor | null
    fetchColors: () => Promise<void>

    setColors: (incomingColors: IColor[]) => void 
    setActivecolor: (incomingColor: IColor) => void
}

export const  useStoreColor = create<IStoreColor>((set) => ({

    colors: [],
    activeColor: null,
    
    setColors: (incomingColors) => set({colors: incomingColors}),

    setActivecolor: (incomingColor) => set({activeColor: incomingColor}),

    fetchColors : async () => {
        const colorsFetched = await getAllColors()
        set({colors : colorsFetched})
    }
}))