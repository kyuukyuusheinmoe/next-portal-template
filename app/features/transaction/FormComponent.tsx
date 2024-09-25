'use client'
import { useContext, useState } from "react";
import { ToastContext } from "@/app/contexts/ToastContext";
import Form from "@/app/components/RHF/Form";
import { useTransition } from "react";
import { CashinForm } from "@/app/constants/transaction/forms";
import transactionService from "@/services/transactionServices";
import { CashInRequest, CashOutRequest, TransactionRequest } from "@/app/types/transaciton";
import { getToastValue } from "@/app/utils/common";
import { CASH_IN, CASH_OUT } from "@/app/constants/common";
import InputText from "@/app/components/Input/InputText";
import walletService from "@/services/walletServices";
import { ApiResponse } from "@/app/types/common";

type FormComponentProps = {
    actionAfterSubmit: () => void
}
const FormComponent = (props: FormComponentProps) => {
    const {actionAfterSubmit} = props
    const [isPending, startTransition] = useTransition()
    const [email, setEmail] = useState("")
    const {updateToastValue} = useContext(ToastContext)
    const [walletId, setWalletId] = useState<any>(null)

    const onSubmit = async (data: TransactionRequest) => {
        startTransition(async()=> {
            const res = data.service === CASH_IN  ? await transactionService.cashin({...data, amount: +data.amount, receiver: data.wallet } as CashInRequest) : data.service === CASH_OUT ? await transactionService.cashout({...data, amount: +data.amount, sender: data.wallet} as CashOutRequest) : null;
            if (res) updateToastValue(getToastValue(res))
            
            if (res?.success) {
                actionAfterSubmit()
            }
        })
    }

    type WalletIdData = {walletId: string}
    const handleSearch = async() => {
        const res: ApiResponse<{data: WalletIdData}> = await walletService.fetchWalletDetailsByEmail(email)
        if (res.success) {
            setWalletId(res?.data?.data?.walletId) 
        }
    }

    return (<>  
                <div className='md:max-w-md max-w-screen-sm flex gap-4 justify-center items-baseline'>
                    <InputText name='email' label="" placeholder='Search By Email' value={email}  onChange={(e)=> setEmail(e.target.value)} />
                    <button type="button" className={"btn mt-2 btn-primary"} onClick={handleSearch} disabled={(email).length <1 as boolean}>Search</button>
                </div>
                {walletId && <Form compoenents={CashinForm} defaultValues={({wallet: walletId})} onSubmit={onSubmit} formStatus={isPending ? "Submitting" : undefined}/>}
            </>)
}

export default FormComponent;