import { create } from "zustand";

interface IStoreModal{
    modalAccount : {type: boolean, valueLogin: boolean}, // Modal de inicio de sesion
    modalEditLogin : {type : boolean, option : 1 | 2 | null}, // Modal que edita datos del usuario logueado
    modalAddProduct : boolean, // Modal para agregar un producto al carrito
    modalEditAdminProduct : boolean, // Modal de administrador 
    modalSubAdmin : {type : boolean, option: 1 | 2 | null}
    modalAddAdminProduct : boolean
    
    openModalAccount : (selection : boolean) => void,
    closeModalAccount : VoidFunction,
    openModalEditLogin : (selection : 1 | 2 | null) => void,
    closeModalEditLogin : VoidFunction,
    openModalAddProduct : VoidFunction,
    closeModalAddProduct : VoidFunction,
    openModalEditAdminProduct : VoidFunction,
    closeModalEditAdminProduct : VoidFunction,
    openModalSubAdmin : (selection : 1 | 2 | null) => void,
    closeModalSubAdmin : VoidFunction,
    openModalAddAdminProduct : VoidFunction,
    closeModalAddAdminProduct : VoidFunction

}

export const useStoreModal = create<IStoreModal>((set) => ({

    modalAccount : {type : false, valueLogin : false},
    modalEditLogin : {type : false, option : null},
    modalAddProduct : false,
    modalEditAdminProduct: false,
    modalSubAdmin : {type : false, option: null},
    modalAddAdminProduct : false,

    openModalAccount : (selection) =>set({modalAccount : {type: true, valueLogin : selection}}),
    closeModalAccount : () => set({modalAccount : {type : false, valueLogin: false}}),

    openModalEditLogin : (selection) => set({modalEditLogin : {type : true, option : selection} }),
    closeModalEditLogin : () => set({modalEditLogin : {type : false, option : null}}),

    openModalAddProduct : () => set({modalAddProduct : true}),
    closeModalAddProduct : () => set({modalAddProduct : false}),

    openModalEditAdminProduct : () => set({modalEditAdminProduct : true}),
    closeModalEditAdminProduct : () => set({modalEditAdminProduct : false}),

    openModalSubAdmin : (selection) => set({modalSubAdmin : {type : true, option : selection}}),
    closeModalSubAdmin : () => set({modalSubAdmin : {type : false, option: null}}),

    openModalAddAdminProduct : () => set({modalAddAdminProduct : true}),
    closeModalAddAdminProduct : () => set({modalAddAdminProduct : false})
}))