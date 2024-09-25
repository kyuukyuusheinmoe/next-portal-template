import { FormElementProps } from "@/app/components/RHF/Form"
import { CASH_IN, CASH_OUT } from "../common"

export const CashinForm : FormElementProps[] = [
    {
        componentType: 'input',
        dataType: 'text',
        name: "wallet",
        label: "Wallet ID",
    },
    {
        componentType: 'select',
        dataType: 'text',
        name: "service",
        label: "Service",
        labelField: "label",
        valueField: "value",
        dataSource: {type: "LIST", 
            options: [{label: "Cash In", value: CASH_IN},
                {label: "Cash Out", value: CASH_OUT}
            ]
        },
        validations: {
            required: true
        }
    },
    {
        componentType: 'select',
        dataType: 'text',
        name: "currency",
        label: "Currency",
        labelField: "label",
        valueField: "value",
        dataSource: {type: "LIST", 
            options: [{label: 'BTC', value: 'BTC'}, {label: 'USDT', value: 'USDT'}]
        },
        validations: {
            required: true
        }
    },
    {
        componentType: 'input',
        dataType: 'text',
        name: "amount",
        label: "Amount",
    }
]