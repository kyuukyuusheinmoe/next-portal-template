"use client"
import { Controller } from 'react-hook-form'
import {FormComponentProps, KeyValueObject } from '@/app/types/common';
import { FormElementMapper } from './FormElementMapper';
import { useTranslation } from '@/app/i18n/client';
import FormControlWrapper from './FormControlWrapper';

export type FormControlElementProps = FormComponentProps & {options?: KeyValueObject[]}

const FormControlElement = (props: FormControlElementProps) => {
  const {componentType, control, validations, name, dataType, label, valueField, components, disabled, asSingle, placeholder} = props;

  const {t} = useTranslation()
  const Component = FormElementMapper[componentType]

  return (  
        <>
            {Component && <Controller control={control} 
                                      rules={{...validations}}
                                      name={name} 
                                      render={({field: {value, onChange}, formState: { defaultValues }}, )=> {
                                      return (<FormControlWrapper 
                                                {...props}
                                                render={(options, labelField, searchTerm, onSearchTermChange )=> {
                                                  return (
                                                          <Component defaultValue={defaultValues?.[value]} 
                                                                      name={name}
                                                                      value={value} 
                                                                      onChange={onChange} 
                                                                      type={dataType} 
                                                                      options={options}
                                                                      label={t(label)} 
                                                                      labelField={labelField}
                                                                      valueField={valueField}
                                                                      components={components} 
                                                                      disabled={disabled}
                                                                      asSingle={asSingle}
                                                                      placeholder={placeholder}
                                                                      searchTerm={searchTerm}
                                                                      required={validations?.required}
                                                                      onSearchTermChange={onSearchTermChange}
                                                                      />)}
                                                       }
                                                />)} }/>}
        </>
  )
}

export default FormControlElement
