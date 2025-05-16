import axios from "axios";
import { ISize } from "../types/ISize";
import { BASE_URL } from "../utils/constantes";


const URL_SIZES = `${BASE_URL}/api/size`

export const getAllSizes = async (): Promise<ISize[]> => {
    try {
        const response = await axios.get(URL_SIZES)
        return response.data
    } catch (error) {
        console.log('Error en getAllSizes', error);
        return []   
    }
}