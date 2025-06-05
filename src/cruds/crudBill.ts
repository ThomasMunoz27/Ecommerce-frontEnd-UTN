import { IBill } from "../types/IBIll";
import interceptorApiClient from "../interceptors/axios.interceptor";



export const getAllBills = async (): Promise<IBill[]> => {
    const response = await interceptorApiClient.get(`/bill`)
    return response.data

}
export const getBillById = async (billId: string): Promise<IBill | undefined> => {
    const response = await interceptorApiClient.get(`/bill/${billId}`)
    return response.data
}

export const postBill = async (newBill: IBill) => {
    const response = await interceptorApiClient.post(`/bill`, newBill)
    return response.data
}

export const putBill = async (updatedBill: IBill) => {
    const response = await interceptorApiClient.put(`/bill/${updatedBill.id}`, updatedBill)
    return response.data
}

export const deleteBill = async (idBillToDelete: string) => {
    const response = await interceptorApiClient.put(`/bill/${idBillToDelete}`)
    return response.data
}

