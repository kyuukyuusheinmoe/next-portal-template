"use server"

import { apiRequest } from "./axiosInstance"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { KeyValueObject } from "@/app/types/common"

type SinginResponse = {
    data:{
        token: string,
        user: KeyValueObject
    }
}

export const siginin = async (data: FormData) => {
    const res = await apiRequest<SinginResponse>('/api/admin/login', {method: 'post', data: {email: data.get('email'), password: data.get("password")}})

    if (res.success && res.data?.data?.token) {
        cookies().set("token", res.data?.data?.token)
        cookies().set("user", JSON.stringify(res.data?.data?.user))

        redirect('/admin/dashboard')
    } else {
        return res;
    }
}

export const logout = async () => {
    cookies().set("token", "")
    cookies().set("user", "")

    redirect('/auth/signin')
}