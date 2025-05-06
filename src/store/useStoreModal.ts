import { create } from "zustand";

interface IStoreModal{
    modalAccount : {type: boolean, valueLogin: boolean},
    modalEditLogin : {type : boolean, option : 1 | 2 | null}
    openModalAccount : (selection : boolean) => void,
    closeModalAccount : VoidFunction,
    openModalEditLogin : (selection : 1 | 2 | null) => void
    closeModalEditLogin : VoidFunction
}

export const useStoreModal = create<IStoreModal>((set) => ({
    modalAccount : {type : false, valueLogin : false},
    modalEditLogin : {type : false, option : null},
    openModalAccount : (selection) =>set({modalAccount : {type: true, valueLogin : selection}}),
    closeModalAccount : () => set({modalAccount : {type : false, valueLogin: false}}),
    openModalEditLogin : (selection) => set({modalEditLogin : {type : true, option : selection} }),
    closeModalEditLogin : () => set({modalEditLogin : {type : false, option : null}})

}))