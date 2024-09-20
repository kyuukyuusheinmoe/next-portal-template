import React, { useState , useEffect, useRef} from 'react';
import { KeyValueObject } from '@/app/types/common';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import FormLabel from '../Typography/FormLabel';
import { FormLabelProps } from '@/app/types/common';

export type MultipleSelectProps = FormLabelProps & {
  label: string; 
  options: KeyValueObject[], 
  labelField: string, 
  valueField: string,
  defaultValue?:string[], 
  value: string[], 
  onChange: (value: string[])=> void,
  required: boolean
}
const MultipleSelect = (props: MultipleSelectProps) => {
  const { label,labelPosition, hiddenLabel, labelStyleClass, options, labelField, valueField, value=[], defaultValue,required, onChange } = props;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleOptionClick = (item: string) => {
    if (value.includes(item)) {
    const newItems = (value.filter((v) => v !== item));
      onChange(newItems)
    } else {
      onChange([...value, item]);
    }
  };

  const isSelected = (item: string) => value.includes(item);

  const displaySelected = () => {
    const selectedValue = value || defaultValue;
    if (selectedValue.length === 0) return "Select Options";
    const selectedLabels = options
      .filter((option) => selectedValue.includes(option[valueField]))
      .map((option) => option[labelField]);
    return selectedLabels.join(", ");
  };

  return (
    <div className={clsx('form-control w-full', labelPosition === 'right' && 'flex flex-row-reverse')}>
      <FormLabel label={label} hiddenLabel={hiddenLabel} labelStyleClass={labelStyleClass} required={required}/>
      <div ref={dropdownRef} className="w-full relative">
        <div className="flex items-center border border-gray-300 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
          <input
            type="text"
            readOnly
            value={displaySelected()}
            onClick={toggleDropdown}
            className="w-full py-2 px-3 bg-white text-gray-700 rounded-md focus:outline-none cursor-pointer"
            placeholder="Select Options"
          />
          <div
            className="px-3 py-2 bg-gray-200 rounded-r-md cursor-pointer"
            onClick={toggleDropdown}
          >
            <ChevronDownIcon className="w-5 h-5 text-gray-500" />
          </div>
        </div>

        {isOpen && (
          <ul className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto z-10">
            {options.map((option) => (
              <li
                key={option[valueField]}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={(e) => handleOptionClick(option[valueField])}
              >
                <label className={clsx("flex items-center cursor-pointer", isSelected(option[valueField]) ? "font-bold" : "")}>
                  <span className="ml-2" onClick={(e) => handleOptionClick(option[valueField])}>{option[labelField]}</span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MultipleSelect;
