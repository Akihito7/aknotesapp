import axios from "axios"
import AppError from '../utils/AppError'; 

export const api = axios.create({
    baseURL: "http://192.168.1.61:7777"
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
