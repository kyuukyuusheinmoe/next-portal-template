'use client'
import { useContext } from "react";
import { ToastContext } from "@/app/contexts/ToastContext";
import Form from "@/app/components/RHF/Form";
import { useTransition } from "react";
import { CashinForm } from "@/app/constants/transaction/forms";
import transactionService from "@/services/transactionServices";
import { TransactionRequest } from "@/app/types/transaciton";
import { getToastValue } from "@/app/utils/common";

type FormComponentProps = {
    actionAfterSubmit: () => void
}
const FormComponent = (props: FormComponentProps) => {
    const {actionAfterSubmit} = props
    const [isPending, startTransition] = useTransition()
    const {updateToastValue} = useContext(ToastContext)

    const onSubmit = async (data: TransactionRequest) => {
        startTransition(async()=> {
            const res = await transactionService.cashin({...data, amount: +data.amount, "receiver": "66ee82c0732e76f1acbb8129", })
            updateToastValue(getToastValue(res))
            
            if (res.success) {
                actionAfterSubmit()
            }
        })
    }
    return (<Form compoenents={CashinForm} onSubmit={onSubmit} formStatus={isPending ? "Submitting" : undefined}/>)
}

export default FormComponent;