import axios from "axios";
import { BASE_URL } from "../utils/constantes";
import { IBill } from "../types/IBIll";


const URL_BILL = `${BASE_URL}/api/bill`

export const getAllBills = async (): Promise<IBill[]> => {
    try {
        const response = await axios.get(URL_BILL)
        return response.data
    } catch (error) {
        console.log('Error en getAllSizes', error);
        return []   
    }
}
export const getBillById = async (sizeId: string): Promise<IBill | undefined> => {
    try{
        const response = await axios.get(`${URL_BILL}/${sizeId}`)
        return response.data
    }catch (err){
        console.log("Error en getBillById" + err)
        return undefined
    }
}

export const postBill = async (newBill: IBill) => {
    try{
        const response = await axios.post(URL_BILL, newBill)
        console.log("Datos de factura enviados")

        return response.data
    }catch (err){
        console.log("Error en postBill" + err)
    }
}

export const putBill = async (updatedBill: IBill) => {
    try{
        const response = await axios.put(`${URL_BILL}/${updatedBill.id}`, updatedBill)
        return response.data
    }catch (err){
        console.log("Error en putBill" + err)
    }
}

export const deleteBill = async (idBillToDelete: string) => {
    try{
        const response = await axios.delete(`${URL_BILL}/${idBillToDelete}`)
        return response.data
    }catch (err){
        console.log("Error en deleteBill" + err)
    }
}

