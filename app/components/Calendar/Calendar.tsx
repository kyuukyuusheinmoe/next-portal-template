"use client"

import React from "react";
import clsx from 'clsx';
import Datepicker from "react-tailwindcss-datepicker";
import FormLabel from "../Typography/FormLabel";
import { FormLabelProps, KeyValueObject } from "@/app/types/common";
import moment from 'moment'
import { DateRangeType } from "react-tailwindcss-datepicker";

export type CalendarProps = FormLabelProps & {
  defaultValue?: Date | DateRangeType;
  asSingle?: boolean;
  value: DateRangeType;
  disabled: boolean;
  onChange: (value: KeyValueObject | null) => void;
  required?: boolean
};

const formatDateChangeValue = (value: DateRangeType) => {
      return value ? Object.keys(value).reduce((acc, key: string)=> {acc[key] = moment(value[key as keyof typeof value]).format('YYYY-MM-DD');return acc; }, {} as KeyValueObject): null;
}

const formatDefaultValue = (value: Date | DateRangeType) => {
  if (value instanceof Date) {
    return {startDate: value, endDate: value}
  }
  return value;
}

const Calendar = (props: CalendarProps) => {

  const {label, value, defaultValue, onChange, hiddenLabel, labelPosition="left", labelStyleClass, asSingle=false, disabled, required=false} = props;

	const handleChange = (selectedDate: DateRangeType| null) => {
    const formatData = selectedDate ? formatDateChangeValue(selectedDate) : null ;
    onChange(formatData)
	}
	

  return (
    <div className={clsx('form-control w-full', labelPosition === 'right' && 'flex flex-row-reverse')}>
        <FormLabel label={label} hiddenLabel={hiddenLabel} labelStyleClass={labelStyleClass} required={required} />
        <div className="border border-gray-300 rounded-lg"><Datepicker 
            containerClassName={"p-0.5 relative"}
            displayFormat="DD-MM-YYYY"
            asSingle={asSingle}
            useRange={!asSingle}
            value={formatDefaultValue(value) || defaultValue && formatDefaultValue(defaultValue)} 
            onChange={newValue => handleChange(newValue)}
            readOnly={true}
            disabled={disabled}
        /> </div>
    </div>
  );
};

export default Calendar
