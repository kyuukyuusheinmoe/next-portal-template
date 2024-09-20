'use client'
import Form from "@/app/components/RHF/Form";
import { useTransition } from "react";
import { CashinForm } from "@/app/constants/transaction/forms";


const FormComponent = () => {

    const [isPending, startTransition] = useTransition()

    const onSubmit = (data: any) => {
        console.log ('xxx submitting ', data)
    }
    return (<Form compoenents={CashinForm} onSubmit={onSubmit} formStatus={isPending ? "Submitting" : undefined}/>)
}

export default FormComponent;