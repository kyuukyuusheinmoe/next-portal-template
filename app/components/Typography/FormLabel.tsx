import React from 'react'
import clsx from 'clsx';
import { FormLabelProps } from '@/app/types/common';

const FormLabel = ({label, hiddenLabel, labelStyleClass, required}: FormLabelProps) => {
  return (
    <>
      {!hiddenLabel && <label className={clsx("label", labelStyleClass)}>
            <span className={clsx("label-text text-base-content font-medium text-[1rem]")}>{label}{required && <span className='text-red-400'>*</span>}</span>
        </label>}
    </>
  )
}

export default FormLabel
