
import clsx from 'clsx';
import { KeyValueObject } from '@/app/types/common';
import FormLabel from '../Typography/FormLabel';
import { FormLabelProps } from '@/app/types/common';

export type SelectBoxProps = FormLabelProps & 
        {   label: string, 
            labelDescription?: string,  
            containerStyle?:string, 
            placeholder?:string, 
            labelStyle?:string, 
            options: KeyValueObject[], 
            labelField: string, 
            valueField: string; 
            value: string, 
            defaultValue?:string,
            disabled?:boolean, 
            required?:boolean, 
            onChange: (value: string)=> void}

function SelectBox(props: SelectBoxProps){
    const {label, hiddenLabel, labelStyleClass, labelPosition, options=[],labelField,valueField,defaultValue, value, onChange, disabled, required} = props;
    
    return (
        <div className={clsx('form-control w-full', labelPosition === 'right' && 'flex flex-row-reverse')}>
            <FormLabel label={label} hiddenLabel={hiddenLabel} labelStyleClass={labelStyleClass} required/>
            <select disabled={disabled} className="select select-bordered block w-full overflow-hidden" value={value || defaultValue || ""} onChange={(e)=> onChange(e.target.value)}>
                <option disabled value="">Select</option>
                {
                    options.map ((option: KeyValueObject, index:number)=>  <option className="w-full" key={`${option[valueField]}-${index}`} value={option[valueField]}>{option[labelField]}</option>)
                }
            </select>
        </div>
    )
}

export default SelectBox
