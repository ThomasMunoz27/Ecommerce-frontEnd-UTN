import { BASE_URL } from "../utils/constantes"

import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

import Swal from "sweetalert2";

//TODO: documentacion axios interceptor https://axios-http.com/docs/interceptors


import { createHTTPError } from "../utils/errors"


// Crear instancia
export const interceptorApiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, //es la demora de una peticion hasta que se cancele
});



// //TODO:TOKEN
// // Helper para guardar el token nuevo
// const saveToken = (token: string) => {
//   localStorage.setItem("accessToken", token);
// };
// Helper para obtener el token del localStorage

// // Intentar renovar token
// const refreshToken = async () => {
  //   try {
    //     const refreshResponse = await axios.post(
      //       "/auth/refresh",
      //       {},
      //       {
        //         baseURL: BASE_URL, // o usa un dominio separado si es necesario
        //         withCredentials: true, // si usás cookies
        //       }
        //     );
        //     const newToken = refreshResponse.data.accessToken;
        //     saveToken(newToken);
        //     return newToken;
        //   } catch (err) {
          //     throw new Error("No se pudo renovar el token.");
          //   }
          // };
          
const getToken = () => {
  const stored = localStorage.getItem("token");
  if (!stored) return null;

  try {
    const parsed = JSON.parse(stored);
    return parsed?.state?.token || null;
  } catch (e) {
    return null;
  }
};

// Añadir token a cada request
interceptorApiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    
    const token = getToken();
    console.log(token)
    if (token) {
      config.headers["Authorization"] =  `Bearer ${token}`;
    }
    if (config.data instanceof FormData && config.headers) {
      delete config.headers["Content-Type"];
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// // Interceptor de respuestas con lógica de renovación
 interceptorApiClient.interceptors.response.use(
   (response) => response,
   async (error: AxiosError) => {
     //toma el status
     const status = error.response?.status;
     //toma server message
     const serverMessage = (error.response?.data as any)?.message;  
  
      if (status === 401) {
// le avisa que la peticion que hicimos con el token viejovolvera a ser llamada
          localStorage.removeItem("accessToken"); // Limpia si falla  del local
          Swal.fire({
            icon: "error",
            title: "Session expired",
            text: "Please log in again.",
            confirmButtonColor: "#d33",
          });
      }
     // 
     // Si es error 500 genérico
     if (status === 500 && (!serverMessage || serverMessage.trim() === "")) {
       Swal.fire({
         icon: "error",
         title: "Oops...",
         text: "Something went wrong on our end. Please try again later.",
         confirmButtonColor: "#d33",
       });
     } else if (status) {
       localStorage.removeItem("token");
   }
  });

export default interceptorApiClient;
