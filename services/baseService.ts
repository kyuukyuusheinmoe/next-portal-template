import { createData, deleteData, get, patchData, putData,getDetailsData } from "./serveractions";
import { ApiResponse } from "@/app/types/common";


export class BaseService {
  private apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  // GET method for fetching a list
  async fetchList<T>(queryParams: { [key: string]: string | number }): Promise<ApiResponse<T>> {
    return get(this.apiUrl, queryParams)
  }

  // POST method for creating a new resource
  async create<T>(data: T, pathName?: string): Promise<ApiResponse<T>> {
    return createData(this.apiUrl, data, pathName)
  }

  // PATCH method for updating a resource
  async patch<T>(id: string, data: Partial<T>, pathName?: string): Promise<ApiResponse<T>> {
    return patchData(this.apiUrl, id, data, pathName)
  }

  // PUT method for updating a resource
  async put<T>(id: string, data: Partial<T>, pathName?: string): Promise<ApiResponse<T>> {
    return putData(this.apiUrl, id, data, pathName)
  }

  // DELETE method for deleting a resource
  async delete<T>(id: string, pathName?: string): Promise<ApiResponse<T>> {
    return deleteData(this.apiUrl, id, pathName)
  }

  // Details method for deleting a resource
  async getDetails<T>(id: string): Promise<ApiResponse<T>> {
    return getDetailsData(this.apiUrl, id)
  }
}
