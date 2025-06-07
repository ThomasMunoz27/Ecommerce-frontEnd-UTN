import { create } from "zustand";
import { IColor } from "../types/IColor";

interface IUseStoreFilterModal {

    // Visible
    visible : boolean
    toggleVisible : () => void

    // Drop orderBy

    orderByDropped : boolean
    toggleOrderBy : () => void

    orderAsc: boolean
    orderDesc: boolean

    toggleAsc : () => void
    toggleDesc : () => void
    


    // Drop sex

    sexDropped : boolean
    toggleSex : () => void

    // Drop color

    colorDropped : boolean
    toggleColor : () => void

    activeColors: IColor[]

    toggleActiveColors: (color: IColor, checked: boolean) => void


    // Clear filters

    clearFilters: () => void

}

export const useStoreFilterModal = create<IUseStoreFilterModal>((set) => ({

    // Visible

    visible : false,
    toggleVisible : () => set((state) => ({visible : !state.visible})),

    // Order by

    orderByDropped: false,
    toggleOrderBy : () => set((state) => ({orderByDropped: !state.orderByDropped})),


    orderAsc: false,
    orderDesc:  false,

    toggleAsc : () => set((state) => ({orderDesc: false, orderAsc: state.orderAsc ? false : true})),
    toggleDesc : () => set((state) => ({orderAsc: false, orderDesc: state.orderDesc ? false : true})),


    // Drop sex

    sexDropped: false,
    toggleSex : () => set((state) => ({sexDropped: !state.sexDropped})),

    // Drop color

    colorDropped: false,

    toggleColor : () => set((state) => ({colorDropped: !state.colorDropped})),
    activeColors: [],
    toggleActiveColors: (color, checked) => set((state) => {
        if(checked){
            return {
                activeColors: state.activeColors.includes(color) ? state.activeColors : [...state.activeColors, color]
            }
        }else{
            return {
                activeColors: state.activeColors.filter((c) => c.id !== color.id)
            }
        }
    }) ,

    clearFilters: () => set((state) => ({
        activeColors: [],
        orderAsc: false, orderDesc: false
        
    }))

}))