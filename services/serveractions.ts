"use server"

import { revalidatePath } from "next/cache"
import { apiRequest } from './axiosInstance';
import { ApiResponse, ServiceApiResponse,} from "@/app/types/common";
import { KeyValueObject } from "@/app/types/common";
import { TransactionRequest, TransactionResponse } from "@/app/types/transaciton";

export const get = async <T>(apiUrl:string, queryParams: KeyValueObject) => {
  const query = new URLSearchParams(queryParams as any).toString();
  return await apiRequest<T>(`${apiUrl}?${query}`, {method: "GET"});
}

export const createData = async <T>(apiUrl: string, data: T, pathName?: string): Promise<ApiResponse<T>> => {
  const res = await apiRequest<T>(`${apiUrl}`, {method: "POST", data: data});

  if (res.success) {
    if (pathName) {
      revalidatePath(pathName);
    }
  } 
  return res;
}

export const patchData = async <T>(apiUrl: string,id: string, data: Partial<T>, pathName?: string): Promise<ServiceApiResponse<T>> => {
  const res = await apiRequest<T>(`${apiUrl}/${id}`, {method: "PATCH", data: data});

  if (res.success) {
    if (pathName) {
      revalidatePath(pathName);
    }
  } 
  return res;
}

export const putData = async <T>(apiUrl: string,id: string, data: Partial<T>, pathName?: string): Promise<ServiceApiResponse<T>> => {
  const res = await apiRequest<T>(`${apiUrl}/${id}`, {method: "PUT", data: data});

  if (res.success) {
    if (pathName) {
      revalidatePath(pathName);
    }
  } 
  return res;
}

export const deleteData = async <T>(apiUrl: string, id:string, pathName?: string): Promise<ServiceApiResponse<T>> => {
  const res = await apiRequest<T>(`${apiUrl}/${id}`, {method: "DELETE"});

  if (res.success) {
    if (pathName) {
      revalidatePath(pathName);
    }
  } 
  return res;
 
}

export const getDetailsData = async <T>(apiUrl: string, id:string): Promise<ServiceApiResponse<T>> => {
  return await apiRequest<T>(`${apiUrl}/${id}`, {method: "GET"});

}

export const cashin = async <T>( data: TransactionRequest ): Promise<ServiceApiResponse<T>> => {
  return await apiRequest('/api/admin/cashIn', {method: "post", data })
}
   