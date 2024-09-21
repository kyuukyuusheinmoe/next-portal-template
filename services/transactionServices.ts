import { TransactionRequest } from "@/app/types/transaciton";
import { BaseService } from "./baseService";
import { cashin } from "./serveractions";

class TransactionService extends BaseService<any,any> {
    constructor () {
        super("transactions");
    }

    cashin (data: TransactionRequest) {
        return cashin(data)
    }
   
}

const transactionService = new TransactionService()
export default transactionService;