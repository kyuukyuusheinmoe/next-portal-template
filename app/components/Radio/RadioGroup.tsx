import { FormLabelProps, KeyValueObject } from '@/app/types/common';
import FormLabel from '../Typography/FormLabel';
import clsx from 'clsx'

export type RadioGroupProps = FormLabelProps & {
    options: KeyValueObject[], 
    value: any, 
    onChange: (value: any) => void,
    labelField?:string,
    valueField?:string,
    required?:boolean
}
const RadioGroup = (props: RadioGroupProps) => {
  const { options, value, onChange, label, labelPosition, hiddenLabel, labelStyleClass, required } = props;
  return (
    <div className={clsx('form-control w-full', labelPosition === 'right' && 'flex flex-row-reverse')}>
      <FormLabel label={label} hiddenLabel={hiddenLabel} labelStyleClass={labelStyleClass} required={required}/>
      {options.map((option) => (
        <label key={option.value} className="label justify-normal gap-2 cursor-pointer">
          <input
            type="radio"
            name="radio-group"
            className="radio checked:bg-blue-500"
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
          />
          <span className="label-text">{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioGroup;
