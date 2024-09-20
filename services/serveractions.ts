"use server"

import { revalidatePath } from "next/cache"
import { axiosInstance } from './axiosInstance';
import { FeatureData, ServiceApiResponse,} from "@/app/types/common";
import { KeyValueObject } from "@/app/types/common";

export const get = async (apiUrl:string, queryParams: KeyValueObject) => {
    try {
        const query = new URLSearchParams(queryParams as any).toString();
        const res = await axiosInstance.get(`${apiUrl}?${query}`);
        return { data: res.data?.data };
      } catch (error: any) {
        return { errorMsg: error?.response?.data?.message || 'Something went wrong' };
      }
}

export const createData = async (apiUrl: string, data: FeatureData, pathName?: string): Promise<ServiceApiResponse<FeatureData>> => {
    try {
        const res = await axiosInstance.post(apiUrl, data);
        if (pathName) {
          revalidatePath(pathName); // Revalidate if using Next.js ISR or SSG
        }
        return {success:true, data: res.data?.data };
      } catch (error: any) {
        console.log ('xxx create error ', error)
        return { success:false, errorMsg: error?.response?.data?.message || 'Something went wrong' };
      }
}

export const patchData = async (apiUrl: string,id: string, data: Partial<FeatureData>, pathName?: string): Promise<ServiceApiResponse<FeatureData>> => {
    try {
        const res = await axiosInstance.patch(`${apiUrl}/${id}`, data);
        if (pathName) {
          revalidatePath(pathName);
        }
        return {success: true, data: res.data?.data };
      } catch (error: any) {
        return {success: false, errorMsg: error?.response?.data?.message || 'Something went wrong' };
      }
}

export const putData = async (apiUrl: string,id: string, data: Partial<FeatureData>, pathName?: string): Promise<ServiceApiResponse<FeatureData>> => {
    try {
        const res = await axiosInstance.put(`${apiUrl}/${id}`, data);
        if (pathName) {
          revalidatePath(pathName);
        }
        return {success: true, data: res.data?.data };
      } catch (error: any) {
        return {success: false, errorMsg: error?.response?.data?.message || 'Something went wrong' };
      }
}

export const deleteData = async (apiUrl: string, id:string, pathName?: string): Promise<ServiceApiResponse<FeatureData>> => {
    try {
        await axiosInstance.delete(`${apiUrl}/${id}`);
        if (pathName) {
          revalidatePath(pathName);
        }
        return { success: true };
      } catch (error: any) {
        return { success: false, errorMsg: error?.response?.data?.message || 'Something went wrong' };
      }
}

export const getDetailsData = async (apiUrl: string, id:string): Promise<ServiceApiResponse<FeatureData>> => {
  try {
     const res = await axiosInstance.get(`${apiUrl}/${id}`);
      
      return { success: true, data: res.data?.data };
    } catch (error: any) {
      return { success: false, errorMsg: error?.response?.data?.message || 'Something went wrong' };
    }
}

   