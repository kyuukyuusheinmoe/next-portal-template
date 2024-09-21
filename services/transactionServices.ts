import { BaseService } from "./baseService";
import { apiRequest } from "./axiosInstance";

class TransactionService extends BaseService<any,any> {
    constructor () {
        super("transactions");
    }

   async cashin() {
        const res = await apiRequest(this.apiUrl, {method: "POST"})

        if (res.success) {
            return {data: res.data?.data}
        }
    }
}

const transactionService = new TransactionService()
export default transactionService;