"use client"
import { createContext, ReactNode, useState, useEffect } from "react";
import clsx from 'clsx'

export type ToastTypes =  "success" | "error" | "info" ;
type ToastValueProps = {type: ToastTypes, text: string|null}

type ToastContextProps = {
    updateToastValue: (value:ToastValueProps) => void
}

export const ToastContext = createContext<ToastContextProps>({updateToastValue: (undefined) => null})

const toastColorMapper = (type: ToastTypes) => {
    switch(type) {
        case "info": return "bg-[#D1ECF1]";
        case "success": return 'bg-[#D4EDDA]';
        case "error": return 'bg-[#F8D7DA]'
    }

}

export const ToastProvider = ({children}: {children: ReactNode}) => {
    const [toastValue, setToastValue] = useState<ToastValueProps | null>(null);

    const toastType = toastValue?.type ? toastColorMapper(toastValue.type) : ""
    useEffect(()=> {
        if (toastValue) {
            setTimeout(()=> {
                setToastValue(null)
            }, 3000)
        }
    }, [toastValue])

    const updateToastValue = (value: ToastValueProps) => {
        setToastValue(value)
    }
    return (<ToastContext.Provider value={{updateToastValue}}> 
                {toastValue && <div className="w-full max-w-sm fixed top-0 z-[50] toast toast-top toast-end">
                    <div className={clsx("alert rounded-sm", toastType)}>
                        <span>{toastValue.text}</span>
                    </div>
                </div>}
                {children}
            </ToastContext.Provider>)
}