import { create } from "zustand";

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
    toggleColor : () => set((state) => ({colorDropped: !state.colorDropped}))

}))