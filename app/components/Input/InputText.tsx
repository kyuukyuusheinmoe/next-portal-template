
import FormLabel from "../Typography/FormLabel";
import { FormLabelProps } from "@/app/types/common";
import clsx from "clsx";

export type InputTextProps = FormLabelProps & 
    {name: string,  
    label?: string, 
    type?: "number" | "text" | "password" | "email", 
    containerStyle?: string, 
    componentStyleClass?:string; 
    defaultValue?: string, 
    placeholder?: string, 
    value:string, 
    onChange: (value: any)=> void, 
    disabled?: boolean,
    required?: boolean
}

function InputText(props: InputTextProps){
    const {label, labelStyleClass, labelPosition, hiddenLabel, type, disabled, placeholder, name, value, onChange, defaultValue="",componentStyleClass, required=false} = props;
    return(
        <div className={clsx('form-control w-full', labelPosition === 'right' && 'flex flex-row-reverse')}>
            {label && <FormLabel label={label} hiddenLabel={hiddenLabel} labelStyleClass={labelStyleClass} required={required} />}
            <input type={type || "text"} name={name} placeholder={placeholder || ""} className={clsx("input input-bordered  ", componentStyleClass ? componentStyleClass : "w-full")} value={ value ?? defaultValue ?? ""} onChange={(e)=>onChange({...e, ...{...e.target, value: type === "number"? Number(e.target.value) : e.target.value}})} disabled={disabled}/>
        </div>
    )
}


export default InputText