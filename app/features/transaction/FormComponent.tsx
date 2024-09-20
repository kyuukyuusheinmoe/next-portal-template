"use client"
import {useTransition, useContext, useEffect} from 'react'
import { useForm, FormProvider } from 'react-hook-form';
import { usePathname } from 'next/navigation';
import FormControlElement from '@/app/components/RHF/FormControlElement';
import { TransactionForm as DefaultTransactionForm } from '@/app/constants/forms/TransactionForm';
import { FormComponentProps, ServiceApiResponse, KeyValueObject, DataSourceTypes, ExternalDependencyProps, ItemDetailsProps, TransactionRequestData } from '@/app/types/common';
import { createTransaction } from '@/services/transactionServices';
import { ToastContext } from '@/app/context/ToastContext';
import useSWR from 'swr'
import { fetcher } from '@/services/axiosInstance';
import { formatMapToArr, getDataFromFieldPath } from '@/app/utils/common';
import { useCookies } from 'react-cookie';
import clsx from 'clsx';
import FormLabel from '@/app/components/Typography/FormLabel';

export type TransactionFormData = Omit<TransactionRequestData, "customer" | "items" | "customerSignature"> & {customer : string | {_id: string}, name: string; nric: string, phone: string, address: string, items: Map<number, ItemDetailsProps>; loanAmount: number, customerSignature: File | string}

type FormElementProps = Omit<FormComponentProps, "control">;

type TrxnFormComponentProps = 
    {   details?: TransactionFormData, 
        action: "create" | "update", 
        handleDialogClose: ()=> void,
        formComponentList?: FormElementProps[]
    };

const checkIfComponentVisible = (data: KeyValueObject, dependency: ExternalDependencyProps) => {
    const value = dependency?.srcPath ? getDataFromFieldPath(dependency.srcPath, data) : null;

    return value === dependency.hasValue
}

const FormComponent = ({details, action, handleDialogClose, formComponentList}: TrxnFormComponentProps) => {
    const TransactionForm = formComponentList ?? DefaultTransactionForm;
    const cookies = useCookies()

    const getDependencyData = (srcType: string) => {
        switch(srcType) {
            case "cookies": return cookies[0];
            default: return {}
        }
    }

    const getDefaultData = (comp: FormElementProps) => {
        if (comp.defaultDataDependency) {
            const data = getDependencyData(comp.defaultDataDependency.source);
            return comp.defaultDataDependency.srcPath ? getDataFromFieldPath(comp.defaultDataDependency.srcPath, data as KeyValueObject): ""
        }
        return comp?.defaultValue ?? null;
    }
    const formDefaultValues = TransactionForm?.reduce((acc, comp: FormElementProps)=> {
        if (comp.componentType === "container") {
            comp.components?.forEach((c: FormElementProps) => {
                const defaultData = getDefaultData(c);
                if (defaultData) {
                    acc[c.name] = defaultData
                }
            })
        } else {
            const defaultData = getDefaultData(comp);
            if (defaultData) {
                acc[comp.name] = defaultData
            }
        }
        return acc;
    }, {} as KeyValueObject)
    
    const methods = useForm<TransactionFormData>( {defaultValues: {...formDefaultValues, ...(details && {...details})}})
    const {handleSubmit, control, formState: {isValid}, setValue, getValues} = methods;
    const [isPending, startTransition] = useTransition()
    const {updateToastValue} = useContext(ToastContext)
    const currentPathName = usePathname()

    console.log ('xxx getValues ', getValues())
    const {data, error, isLoading} = useSWR('/api/settings', fetcher)

    const settingData = data?.data?.data;

    useEffect(()=> {
        if (settingData) {
            const dueMonthValue = settingData?.find((d: any)=> d.code === "DUEMONTH")?.value;
            if (dueMonthValue) {
                setValue("dueMonth", dueMonthValue)
            } 
        }
    }, [settingData])

    const getConfigLabelValue = (conf: KeyValueObject) => {
        return (Object.entries(conf).map(([key,value])=> ({label: `${key} - ${value} %`, value:key, interestVal: value}))?.[0])
    }

    const interestConfig = settingData?.find((d: any)=> d.code === "INTEREST")?.config?.map((conf:KeyValueObject)=> {
        return getConfigLabelValue(conf); 
    });

    const TransactionFormComponents:FormElementProps[] = settingData ? TransactionForm.map((comp: FormElementProps) => {
            if (comp.componentType === "container") {
                return ({...comp, components: comp?.components?.map (com => {
                    if (com.name === "category") {
                        return ({...com, dataSource: {...com.dataSource,type: com.dataSource?.type as DataSourceTypes, options: settingData?.find((d: any)=> d.code === "CATEGORY")?.config?.map((conf:string)=> ({label: conf, value: conf}))}})
                    } 
                    if (com.name === "interestRate") {
                        return ({...com, dataSource: {...com.dataSource, type: com.dataSource?.type as DataSourceTypes, options: interestConfig}})
                    } 
    
                    return com;
                })})
            } else {
                if (comp.name === "category") {
                    return ({...comp, dataSource: {...comp.dataSource,type: comp.dataSource?.type as DataSourceTypes, options: settingData?.find((d: any)=> d.code === "CATEGORY")?.config?.map((conf:string)=> ({label: conf, value: conf}))}})
                } 
                if (comp.name === "interestRate") {
                    return ({...comp, dataSource: {...comp.dataSource, type: comp.dataSource?.type as DataSourceTypes, options: interestConfig}})
                } 
            }

            return comp;
    }) :  TransactionForm;


    const onSubmit = async (data: TransactionFormData) => {

        const itemsArray = formatMapToArr(data.items);
        const requestBody = {
            customer: typeof data.customer === 'string' ? data.customer : data.customer._id,
            shop: data.shop,
            counter: data.counter,
            amount: data.amount,
            dueMonth: data.dueMonth,
            category: data.category,
            serviceFee: data.serviceFee,
            interestRate: interestConfig.find((conf: KeyValueObject)=> conf.value === data.interestRate)?.interestVal,
            items: [...itemsArray],
            voucherCode: data.voucherCode,
            customerSignature: typeof data.customerSignature === "string" ? data.customerSignature : data.customerSignature?.name,
            debitOfficerName: data.debitOfficerName,
            debitOfficerRemark: data.debitOfficerRemark,
            creditOfficerName: data.debitOfficerName,
            creditOfficerRemark: data.debitOfficerRemark,
            image: data.image,
            goldWeight: data.goldWeight,
            wearWeight: data.wearWeight,
            goldType: data.goldType,
            weight: data.weight
        }

        startTransition(async()=> {
            const res = action === 'create' ? await createTransaction(requestBody,currentPathName) : {} as ServiceApiResponse<any>
        
            if (res && res?.success) {
                handleDialogClose()
            } else {
                updateToastValue({type: "error", text: res.errorMsg || "Something went wrong, please try again"})
            }
        })
    }

  if (error) {
    return <p> It's getting the error</p>
  }

  if (isLoading) {
    return <p> Form Loading...</p>
  }

  return (
    !isLoading && <div> 
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {
                    TransactionFormComponents?.map ((component: FormElementProps, index: number) => {
                    if (component.componentType === "container" && component.components?.length) {
                            const componentShouldVisible = component.containerDependency?.state === "VISIBLE" ? checkIfComponentVisible(getDependencyData(component.containerDependency.source) as KeyValueObject, component.containerDependency) : true;
                            return (componentShouldVisible && <div className='p-4' key={`${component.name}-${index}`}>  
                                        {component.label && <FormLabel label={component.label}/>}
                                        <div className={clsx(component.containerClass)}> 
                                            {component?.components.map ((component, idx)=> <FormControlElement key={`${component.name}-${idx}`} {...component} control={control}  />)}
                                        </div>
                                    </div>)
                    } 
                    return <div className='p-4' key={`${component.name}-${index}`}> <FormControlElement {...component} control={control}/></div>
                })
                }
                <div className="flex justify-end mt-4">
                    <button className="btn btn-primary" disabled={isPending || !isValid}>Submit</button>
                </div>
            </form>
        </FormProvider>
    </div>
  )
}

export default FormComponent
