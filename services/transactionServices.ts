import { CashInRequest, CashOutRequest } from "@/app/types/transaciton";
import { BaseService } from "./baseService";
import { cashin, cashout } from "./serveractions";

class TransactionService extends BaseService<any,any> {
    constructor () {
        super("transactions");
    }

    cashin (data: CashInRequest) {
        return cashin(data)
    }

    cashout (data: CashOutRequest) {
        return cashout(data)
    }
   
}

const transactionService = new TransactionService()
export default transactionService;