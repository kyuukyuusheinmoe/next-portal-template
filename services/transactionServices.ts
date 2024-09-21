import { BaseService } from "./baseService";
import { apiRequest } from "./axiosInstance";
import { TransactionResponse } from "@/app/types/transaciton";
import { ApiResponse } from '@/app/types/common';

class TransactionService extends BaseService<any,any> {
    constructor () {
        super("transactions");
    }

   async cashin() {
        const res = await apiRequest<ApiResponse<TransactionResponse>>(this.apiUrl, {method: "POST"})

        if (res.success) {
            return {data: res.data?.data}
        }
    }
}

const transactionService = new TransactionService()
export default transactionService;