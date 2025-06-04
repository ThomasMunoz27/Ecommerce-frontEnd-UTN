
import interceptorApiClient from "../interceptors/axios.interceptor"




export const goToPay =  async (cartItems: any) => {
    const response = await interceptorApiClient.post(`payments/create-preference`, cartItems)
    const prefId = response.data.preferenceId
    return prefId
}

export const setConfirmedBill = async (preferenceId: string) => {
    const response = await interceptorApiClient.put(`bill/confirm/${preferenceId}`)
    return response.data
}