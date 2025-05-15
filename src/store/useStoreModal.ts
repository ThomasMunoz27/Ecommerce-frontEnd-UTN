import { create } from "zustand";

interface IStoreModal{
    modalAccount : {type: boolean, valueLogin: boolean}, // Modal de inicio de sesion
    modalEditLogin : {type : boolean, option : 1 | 2 | null}, // Modal que edita datos del usuario logueado
    modalAddProduct : boolean, // Modal para agregar un producto al carrito
    modalAdminProduct : boolean, // Modal de administrador 
    openModalAccount : (selection : boolean) => void,
    closeModalAccount : VoidFunction,
    openModalEditLogin : (selection : 1 | 2 | null) => void,
    closeModalEditLogin : VoidFunction,
    openModalAddProduct : VoidFunction,
    closeModalAddProduct : VoidFunction,
    openModalAdminProduct : VoidFunction,
    closeModalAdminProduct : VoidFunction
}

export const useStoreModal = create<IStoreModal>((set) => ({
    modalAccount : {type : false, valueLogin : false},
    modalEditLogin : {type : false, option : null},
    modalAddProduct : false,
    modalAdminProduct: false,
    openModalAccount : (selection) =>set({modalAccount : {type: true, valueLogin : selection}}),
    closeModalAccount : () => set({modalAccount : {type : false, valueLogin: false}}),
    openModalEditLogin : (selection) => set({modalEditLogin : {type : true, option : selection} }),
    closeModalEditLogin : () => set({modalEditLogin : {type : false, option : null}}),
    openModalAddProduct : () => set({modalAddProduct : true}),
    closeModalAddProduct : () => set({modalAddProduct : false}),
    openModalAdminProduct : () => set({modalAdminProduct : true}),
    closeModalAdminProduct : () => set({modalAdminProduct : false})
}))