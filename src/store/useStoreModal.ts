import { create } from "zustand";

interface IStoreModal{
    modalAccount : {type: boolean, valueLogin: boolean}, // Modal de inicio de sesion
    modalEditLogin : {type : boolean, option : 1 | 2 | null}, // Modal que edita datos del usuario logueado
    modalAddProduct : boolean, // Modal para agregar un producto al carrito
    modalEditAdminProduct : boolean, // Modal de administrador 
    modalSubAdmin : {type : boolean, option: 1 | 2 | null},
    modalAddAdminProduct : boolean,
    modalPrices : boolean,
    modalAdminColor : {type: boolean, option : 1 | 2 | null},
    modalAdminSize : {type : boolean, option : 1 | 2 | null},
    
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
    closeModalAddAdminProduct : VoidFunction,
    openModalPrices : VoidFunction,
    closeModalPrices : VoidFunction
    openModalAdminColor : (selection : 1 | 2 | null) => void
    closeModalAdminColor : VoidFunction
    openModalAdminSize : (selection : 1 | 2 |  null) => void,
    closeModalAdminSize : VoidFunction

}

export const useStoreModal = create<IStoreModal>((set) => ({

    modalAccount : {type : false, valueLogin : false},
    modalEditLogin : {type : false, option : null},
    modalAddProduct : false,
    modalEditAdminProduct: false,
    modalSubAdmin : {type : false, option: null},
    modalAddAdminProduct : false,
    modalPrices : false,
    modalAdminColor : {type : false, option : null},
    modalAdminSize : {type : false, option : null},
    

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
    closeModalAddAdminProduct : () => set({modalAddAdminProduct : false}),

    openModalPrices : () => set({modalPrices : true}),
    closeModalPrices : () => set({modalPrices : false}),

    openModalAdminColor : (selection) => set({modalAdminColor : {type : true, option : selection}}),
    closeModalAdminColor : () => set({modalAdminColor :{type : false, option : null }}),

    openModalAdminSize : (selection) => set({modalAdminSize : {type : true, option : selection}}),
    closeModalAdminSize : () => set({modalAdminSize : {type : false, option : null}})
}))