import { create } from "zustand";

interface IStoreModal{
    modalAccount : {type: boolean, valueLogin: boolean}, // Modal de inicio de sesion
    modalEditLogin : {type : boolean, option : 1 | 2 | null}, // Modal que edita datos del usuario logueado
    modalAddProduct : boolean, // Modal para agregar un producto al carrito
    modalPrices : boolean,
    modalEditAddress : boolean,
    modalAdminEditUser : boolean,

    modalAdminColor : {type: boolean, option : 1 | 2 | null},
    modalAdminSize : {type : boolean, option : 1 | 2 | null},
    modalAdminDiscount : {type : boolean, option : 1 | 2 | null},
    modalAdminPrice : {type : boolean, option : 1 | 2 | null},
    modalAdminImage : boolean,
    modalAdminCountry : boolean,
    modalAdminProvince : boolean,
    modalAdminLocality : boolean,
    modalAdminAdress : boolean
    
    modalAdminProduct : {type : boolean, option : 1 | 2 | null},
    modalAdminSubSize : {type : boolean, option : 1 | 2 | null},
    modalAdminSubColor : {type : boolean, option: 1 | 2 | null},
    modalAdminSubPrice : {type : boolean, option: 1 | 2 | null},
    modalAdminSubCategory : {type : boolean, option : 1 | 2 | null},
    modalAdminSubAddress : boolean,
    modalAdminCategory : boolean,

    modalViewBill : boolean
    
    
    openModalAccount : (selection : boolean) => void,
    closeModalAccount : VoidFunction,

    openModalEditLogin : (selection : 1 | 2 | null) => void,
    closeModalEditLogin : VoidFunction,

    openModalAddProduct : VoidFunction,
    closeModalAddProduct : VoidFunction,

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
    closeModalAdminProduct : VoidFunction,

    openAdminSubSize : (selection : 1 | 2 | null) => void,
    closeAdminSubSize : () => void,

    openAdminSubColor : (selection : 1 | 2 | null) => void,
    closeAdminSubColor : () => void

    openAdminSubPrice : (selection : 1 | 2 | null) => void,
    closeAdminSubPrice : () => void

    openAdminSubCategory : (selection : 1 | 2 | null) => void,
    closeAdminSubCategory : () => void

    openModalAdminCategory : () => void
    closeModalAdminCategory : () => void,

    openModalAdminImage : () => void,
    closeModalAdminImage : () => void,

    openModalAdminCountry : () => void,
    closeModalAdminCountry  : () => void,

    openModalAdminProvince : () => void,
    closeModalAdminProvince  : () => void,

    openModalAdminLocality : () => void,
    closeModalAdminLocality  : () => void,

    openModalAdminAdress : () => void,
    closeModalAdminAdress  : () => void,
    
    openModalEditAddress : () => void,
    closeModalEditAddress : () => void

    openModalViewBill : () => void,
    closeModalViewBill : () => void

    openAdminModalEditUser : () => void,
    closeAdminModalEditUser : () => void,

    openSubAdminAddress : () => void,
    closeSubAdminAddress : () => void


}

export const useStoreModal = create<IStoreModal>((set) => ({

    modalAccount : {type : true, valueLogin : false},
    modalEditLogin : {type : false, option : null},
    modalAddProduct : false,
    modalEditAdminProduct: false,
    modalAddAdminProduct : false,
    modalPrices : false,
    

    modalAdminLocality : false,
    modalAdminAdress : false,
    modalAdminColor : {type : false, option : null},
    modalAdminSize : {type : false, option : null},
    modalAdminDiscount : {type : false, option : null},
    modalAdminPrice : {type : false, option : null},
    modalAdminCategory : false,
    modalAdminImage : false,
    modalAdminCountry : false,
    modalAdminProvince : false,
    modalAdminEditUser : false,

    modalAdminProduct : {type : false, option: null},
    modalAdminSubSize : {type : false, option : null},
    modalAdminSubColor : {type : false, option : null},
    modalAdminSubPrice : {type : false, option : null},
    modalAdminSubCategory : {type : false, option : null},
    modalAdminSubAddress : false,

    modalEditAddress : false,

    modalViewBill: false,



    
    openModalAccount : (selection) =>set({modalAccount : {type: true, valueLogin : selection}}),
    closeModalAccount : () => set({modalAccount : {type : false, valueLogin: false}}),

    openModalEditLogin : (selection) => set({modalEditLogin : {type : true, option : selection} }),
    closeModalEditLogin : () => set({modalEditLogin : {type : false, option : null}}),

    openModalAddProduct : () => set({modalAddProduct : true}),
    closeModalAddProduct : () => set({modalAddProduct : false}),

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
    closeModalAdminProduct : () => set({modalAdminProduct : {type : false, option : null}}), 

    openAdminSubSize : (selection) => set({modalAdminSubSize : {type : true, option : selection}}),
    closeAdminSubSize : () => set({modalAdminSubSize : {type : false, option : null}}),

    openAdminSubColor : (selection) => set({modalAdminSubColor : {type : true, option : selection}}),
    closeAdminSubColor : () => set({modalAdminSubColor : {type : false, option : null}}),

    openAdminSubPrice : (selection) => set({modalAdminSubPrice : {type : true, option : selection}}),
    closeAdminSubPrice : () => set({modalAdminSubPrice : {type : false, option : null}}),

    openAdminSubCategory : (selection) => set({modalAdminSubCategory : {type : true, option : selection}}),
    closeAdminSubCategory : () => set({modalAdminSubCategory : {type : false, option : null}}),

    openModalAdminCategory : () => set({modalAdminCategory : true}),
    closeModalAdminCategory : () => set({modalAdminCategory : false}),

    openModalAdminImage : () => set({modalAdminImage : true}),
    closeModalAdminImage : () => set({modalAdminImage : false}),

    openModalAdminCountry : () => set({modalAdminCountry : true}),
    closeModalAdminCountry : () => set({modalAdminCountry : false}),

    openModalAdminProvince : () => set({modalAdminProvince : true}),
    closeModalAdminProvince : () => set({modalAdminProvince : false}),

    openModalAdminAdress : () => set({modalAdminAdress : true}),
    closeModalAdminAdress : () => set({modalAdminAdress : false}),

    openModalAdminLocality : () => set({modalAdminLocality : true}),
    closeModalAdminLocality : () => set({modalAdminLocality : false}),

    openModalEditAddress : () => set({modalEditAddress : true}),
    closeModalEditAddress : () => set({modalEditAddress : false}),

    openModalViewBill : () => set({modalViewBill : true}),
    closeModalViewBill : () => set({modalViewBill : false}),

    openAdminModalEditUser : () => set({modalAdminEditUser : true}),
    closeAdminModalEditUser : () => set({modalAdminEditUser : false}),

    openSubAdminAddress : () => set({modalAdminSubAddress : true}),
    closeSubAdminAddress : () => set({modalAdminSubAddress : false})

    
}))