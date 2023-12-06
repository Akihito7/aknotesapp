import axios from "axios"
import AppError from '../utils/AppError'; 

export const api = axios.create({
    baseURL: "https://backendaknotes.vercel.app"
});


api.interceptors.response.use(request => request,
    (error) => {
        if (error.response && error.response.data) {
            return Promise.reject(new AppError(error.response.data.message))
        }

        else {
            return Promise.reject(error)
        }
    })
