import { create } from "zustand";

interface IUseStoreFilterModal {
    visible : boolean
    toggleVisible : () => void
}

export const useStoreFilterModal = create<IUseStoreFilterModal>((set) => ({
    visible : false,
    toggleVisible : () => set((state) => ({visible : !state.visible}))
}))