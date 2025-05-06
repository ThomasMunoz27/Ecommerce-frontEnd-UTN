import { create } from "zustand";

interface IStoreModal{
    modalAccount : boolean,
    modalEditLogin : {type : boolean, option : 1 | 2 | null}
    openModalAccount : VoidFunction,
    closeModalAccount : VoidFunction,
    openModalEditLogin : (selection : 1 | 2 | null) => void
    closeModalEditLogin : VoidFunction
}

export const useStoreModal = create<IStoreModal>((set) => ({
    modalAccount : false,
    modalEditLogin : {type : false, option : null},
    openModalAccount : () =>set({modalAccount : true}),
    closeModalAccount : () => set({modalAccount : false}),
    openModalEditLogin : (selection) => set({modalEditLogin : {type : true, option : selection} }),
    closeModalEditLogin : () => set({modalEditLogin : {type : false, option : null}})

}))