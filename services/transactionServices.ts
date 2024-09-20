import { BaseService } from "./baseService";

class TransactionService extends BaseService<any,any> {
    constructor () {
        super("transactions")
    }
}

const transactionService = new TransactionService()
export default transactionService;