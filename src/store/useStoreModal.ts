import { create } from "zustand";

interface IStoreModal{
    modalAccount : boolean,
    modalEditLogin : boolean,
    openModalAccount : VoidFunction,
    closeModalAccount : VoidFunction,
    openModalEditLogin : VoidFunction,
    closeModalEditLogin : VoidFunction
}

export const useStoreModal = create<IStoreModal>((set) => ({
    modalAccount : false,
    modalEditLogin : false,
    openModalAccount : () =>set({modalAccount : true}),
    closeModalAccount : () => set({modalAccount : false}),
    openModalEditLogin : () => set({modalEditLogin : true }),
    closeModalEditLogin : () => set({modalEditLogin : false})

}))