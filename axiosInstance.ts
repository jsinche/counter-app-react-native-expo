import axios, { AxiosInstance } from "axios";

let baseURL = "https://smartrooster.us/api";
let authToken: string | null = null;
// Función para configurar la baseURL
export const setBaseURL = (url: string) => {
  baseURL = `https://${url ? url + "." : ""}smartrooster.us/api`;
};
export const setAuthToken = (token: string | null) => {
  authToken = token; // Actualiza el token
};
// Crear instancia de Axios
const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para actualizar la baseURL en cada solicitud
axiosInstance.interceptors.request.use((config) => {
  config.baseURL = baseURL; // Asegura que use la última baseURL configurada
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`; // Agrega el token al header
  } else {
    delete config.headers.Authorization; // Elimina el header si no hay token
  }
  return config;
});

export default axiosInstance;
