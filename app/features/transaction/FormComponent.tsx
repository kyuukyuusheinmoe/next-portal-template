'use client'
import Form from "@/app/components/RHF/Form";
import { useTransition } from "react";
import { CashinForm } from "@/app/constants/transaction/forms";
import transactionService from "@/services/transactionServices";
import { TransactionRequest } from "@/app/types/transaciton";

type FormComponentProps = {
    actionAfterSubmit: () => void
}
const FormComponent = (props: FormComponentProps) => {
    const {actionAfterSubmit} = props
    const [isPending, startTransition] = useTransition()

    const onSubmit = async (data: TransactionRequest) => {
        startTransition(async()=> {
            const res = await transactionService.cashin({...data, amount: +data.amount, "receiver": "66e5589a40ad7e19d63bca84", })
            if (res.success) {
                actionAfterSubmit()
            }
        })
    }
    return (<Form compoenents={CashinForm} onSubmit={onSubmit} formStatus={isPending ? "Submitting" : undefined}/>)
}

export default FormComponent;