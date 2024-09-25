import { account, CASH_IN, CASH_OUT, CREDIT, DEBIT, Fail, FUNDING, peding, pocket, POCKET, settled, Success } from "../constants/common"

export type TransactionRequest = {
    amount: number,
    service: typeof CASH_IN | typeof CASH_OUT
    currency: string;
    wallet: string
}

export type CashInRequest = TransactionRequest & {
    receiver: string
}
export type CashOutRequest = TransactionRequest & {
    sender: string
}
export type TransactionResponse = {
        user: string,
        amount: number,
        currency: string,
        service: typeof CASH_IN | typeof CASH_OUT,
        type: typeof CREDIT | typeof DEBIT,
        sender: string,
        receiver: string,
        status: typeof settled | typeof peding,
        creditLog: {
            walletId: string,
            user: string,
            name: typeof POCKET,
            type: typeof pocket,
            currency: string,
            before: {
                balance: number
            },
            after: {
                balance: number
            },
            err: 0,
            message: typeof Success | typeof Fail
        },
        debitLog: {
            walletId: string,
            name: typeof FUNDING,
            type: typeof account,
            currency: string,
            before: {
                balance: number
            },
            after: {
                balance: number
            },
            err: 0 | 1,
            message: string
        },
        _id: string,
        createdAt:Date,
        updatedAt:Date,
}

