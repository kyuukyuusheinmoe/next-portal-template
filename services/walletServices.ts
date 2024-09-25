import { CashInRequest, CashOutRequest } from "@/app/types/transaciton";
import { BaseService } from "./baseService";
import { cashin, cashout, getWalletDetailsByEmails } from "./serveractions";
import { ApiResponse } from '@/app/types/common';

class WalletService extends BaseService<any,any> {
    constructor () {
        super("wallets");
    }

    cashin (data: CashInRequest) {
        return cashin(data)
    }

    cashout (data: CashOutRequest) {
        return cashout(data)
    }

    fetchWalletDetailsByEmail (email: string): Promise<ApiResponse<{data: {walletId: string}}>> {
        return getWalletDetailsByEmails(email)
    }
   
}

const walletService = new WalletService()
export default walletService;