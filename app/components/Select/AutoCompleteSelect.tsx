import clsx from 'clsx';
import { useState } from 'react';
import { KeyValueObject } from '@/app/types/common';
import FormLabel from '../Typography/FormLabel';
import { FormLabelProps } from '@/app/types/common';
import { XMarkIcon } from '@heroicons/react/24/outline';

export type AutoCompleteSelectProps = FormLabelProps & {
  label: string;
  labelDescription?: string;
  containerStyle?: string;
  placeholder?: string;
  customLabelField?:string;
  labelStyle?: string;
  options: KeyValueObject[];
  labelField: string;
  valueField?: string;
  value: string;
  required?:boolean;
  defaultValue?: string | KeyValueObject;
  disabled?: boolean;
  searchTerm:string | null;
  onChange: (value: string | KeyValueObject) => void;
  onSearchTermChange: (value: string) => void;
};

function AutoCompleteSelect(props: AutoCompleteSelectProps) {
  const {
    label,
    hiddenLabel,
    labelStyleClass,
    labelPosition,
    options,
    labelField,
    valueField,
    searchTerm,
    onSearchTermChange,
    required,
    onChange,
    disabled,
    placeholder,
    defaultValue
  } = props;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  

  const defaultValueLabel = valueField ? options.find((option) =>  option[valueField] === defaultValue)?.[labelField] : defaultValue instanceof Object  ? defaultValue?.[labelField] :'';
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchTermChange(e.target.value);
  };

  const handleOptionClick = (optionValue: string | KeyValueObject) => {
    onChange(optionValue);
    onSearchTermChange(
      valueField && typeof optionValue === 'string' ? options.find((option) => option[valueField] === optionValue)?.[labelField] : optionValue instanceof Object ? optionValue[labelField as string] : ''
    );
    setIsDropdownOpen(false);
  };

  const handleRemoveSearchText = () => {
    onSearchTermChange("")
  }

  return (
    <div className={clsx('form-control w-full', labelPosition === 'right' && 'flex flex-row-reverse')}>
      <FormLabel label={label} hiddenLabel={hiddenLabel} labelStyleClass={labelStyleClass} required={required}/>
      <div className="relative w-full">
        <div className='flex justify-between items-center input-border border rounded-lg bg-white px-2'>
          <input
            type="text"
            value={searchTerm === null ? defaultValueLabel :searchTerm }
            onChange={handleInputChange}
            placeholder={placeholder || 'Select'}
            className="input w-full border-none"
            disabled={disabled}
            onFocus={() => setIsDropdownOpen(true)}
            onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)} // Delay to allow option click
          />
         { searchTerm && searchTerm?.length > 0 && <XMarkIcon className='w-6 h-6 cursor-pointer' onClick={handleRemoveSearchText}/>}
        </div>
        
        {isDropdownOpen && searchTerm && searchTerm.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {options.length > 0 ? options.map((option, index) => (
              <li
                key={`${index}`}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                onClick={() => handleOptionClick(valueField ? option[valueField] : option)}
              >
                {option[labelField]}
              </li>
            )) : <li  className="cursor-pointer px-4 py-2 hover:bg-gray-100"> No Data Found</li>}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AutoCompleteSelect;
