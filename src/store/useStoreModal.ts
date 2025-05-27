import { create } from "zustand";

interface IStoreModal{
    modalAccount : {type: boolean, valueLogin: boolean}, // Modal de inicio de sesion
    modalEditLogin : {type : boolean, option : 1 | 2 | null}, // Modal que edita datos del usuario logueado
    modalAddProduct : boolean, // Modal para agregar un producto al carrito
    modalSubAdmin : {type : boolean, option: 1 | 2 | null},
    modalPrices : boolean,
    modalAdminColor : {type: boolean, option : 1 | 2 | null},
    modalAdminSize : {type : boolean, option : 1 | 2 | null},
    modalAdminDiscount : {type : boolean, option : 1 | 2 | null},
    modalAdminPrice : {type : boolean, option : 1 | 2 | null},
    modalAdminProduct : {type : boolean, option : 1 | 2 | null}
    
    openModalAccount : (selection : boolean) => void,
    closeModalAccount : VoidFunction,

    openModalEditLogin : (selection : 1 | 2 | null) => void,
    closeModalEditLogin : VoidFunction,

    openModalAddProduct : VoidFunction,
    closeModalAddProduct : VoidFunction,

    openModalSubAdmin : (selection : 1 | 2 | null) => void,
    closeModalSubAdmin : VoidFunction,

    openModalPrices : VoidFunction,
    closeModalPrices : VoidFunction

    openModalAdminColor : (selection : 1 | 2 | null) => void
    closeModalAdminColor : VoidFunction

    openModalAdminSize : (selection : 1 | 2 |  null) => void,
    closeModalAdminSize : VoidFunction,

    openModalAdminDiscount : (selection : 1 | 2 | null) => void
    closeModalAdminDiscount : VoidFunction

    openModalAdminPrice : (selection : 1 | 2 | null) => void
    closeModalAdminPrice : VoidFunction,

    openModalAdminProduct : (selection : 1 | 2 | null) => void,
    closeModalAdminProduct : VoidFunction


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
    modalAdminDiscount : {type : false, option : null},
    modalAdminPrice : {type : false, option : null},
    modalAdminProduct : {type : false, option: null},

    
    openModalAccount : (selection) =>set({modalAccount : {type: true, valueLogin : selection}}),
    closeModalAccount : () => set({modalAccount : {type : false, valueLogin: false}}),

    openModalEditLogin : (selection) => set({modalEditLogin : {type : true, option : selection} }),
    closeModalEditLogin : () => set({modalEditLogin : {type : false, option : null}}),

    openModalAddProduct : () => set({modalAddProduct : true}),
    closeModalAddProduct : () => set({modalAddProduct : false}),

    openModalSubAdmin : (selection) => set({modalSubAdmin : {type : true, option : selection}}),
    closeModalSubAdmin : () => set({modalSubAdmin : {type : false, option: null}}),

    openModalPrices : () => set({modalPrices : true}),
    closeModalPrices : () => set({modalPrices : false}),

    openModalAdminColor : (selection) => set({modalAdminColor : {type : true, option : selection}}),
    closeModalAdminColor : () => set({modalAdminColor :{type : false, option : null }}),

    openModalAdminSize : (selection) => set({modalAdminSize : {type : true, option : selection}}),
    closeModalAdminSize : () => set({modalAdminSize : {type : false, option : null}}),

    openModalAdminDiscount : (selection) => set({modalAdminDiscount : {type : true, option : selection}}),
    closeModalAdminDiscount : () => set({modalAdminDiscount : {type : false, option : null}}),

    openModalAdminPrice : (selection) => set({modalAdminPrice : {type : true, option : selection}}),
    closeModalAdminPrice : () => set({modalAdminPrice : {type : false, option : null}}),

    openModalAdminProduct : (selection) => set({modalAdminProduct : {type : true, option : selection}}),
    closeModalAdminProduct : () => set({modalAdminProduct : {type : false, option : null}})

    
}))