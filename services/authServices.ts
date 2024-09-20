"use server"

import { apiRequest } from "./axiosInstance"

export const siginin = async (data: FormData) => {
    return await apiRequest('/api/admin/login', {method: 'post', data: {email: data.get('email'), password: data.get("password")}})
}