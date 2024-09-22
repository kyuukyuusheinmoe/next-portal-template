import { BaseService } from "./baseService";

class TransactionService extends BaseService<any,any> {
    constructor () {
        super("/api/admin/requestHistory");
    }
}

const requestService = new TransactionService()
export default requestService;