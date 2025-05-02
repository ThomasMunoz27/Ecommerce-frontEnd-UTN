import { create } from "zustand";

interface IStoreModal{
    modalAccount : boolean,
    openModalAccount : VoidFunction
    closeModalAccount : VoidFunction
}

export const useStoreModal = create<IStoreModal>((set) => ({
    modalAccount : false,
    openModalAccount : () =>set({modalAccount : true}),
    closeModalAccount : () => set({modalAccount : false})
}))