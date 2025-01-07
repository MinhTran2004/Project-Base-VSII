import { IApiResponse } from '../types/types';
import axios from './axios.customize';

export const getOrderById = (id: string) => {
    const urlBackend = `/store/order/${id}`;
    return axios.get<IApiResponse>(urlBackend,
        // {
        //     headers: {
        //         delay: 3000
        //     }
        // }
    )
}

export const loginAPI = (username: string, password: string) => {
    const urlBackend = `user/login?username=${username}&password=${password}`;
    return axios.get(urlBackend)
}