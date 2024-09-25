"use client"
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { FormControlElementProps } from './FormControlElement';
import FormLabel from '../Typography/FormLabel';
import clsx from 'clsx';
import FormControlElement from './FormControlElement';

export type FormElementProps = Omit<FormControlElementProps, "control">

type FormProps = {
  formStatus?: "Submitting",
  onSubmit: (data: any) => void,
  compoenents: FormElementProps[],
  defaultValues?: any
}


const Form = ({formStatus, onSubmit, compoenents, defaultValues}: FormProps) => {
    const methods = useForm({...(defaultValues && {defaultValues})})
    const {handleSubmit, control} = methods;

  return (
    <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {
                    compoenents?.map ((component: FormElementProps, index: number) => {
                    if (component.componentType === "container" && component.components?.length) {
                            return (<div className='p-4' key={`${component.name}-${index}`}>  
                                        {component.label && <FormLabel label={component.label}/>}
                                        <div className={clsx(component.containerClass)}> 
                                            {component?.components.map ((component, idx)=> <FormControlElement key={`${component.name}-${idx}`} {...component} control={control}  />)}
                                        </div>
                                    </div>)
                    } 
                    return <div className='p-4' key={`${component.name}-${index}`}> <FormControlElement {...component} control={control}/></div>
                })
              }
              <div className="flex justify-end mt-4">
                <button type='submit' className="btn btn-primary" disabled={formStatus === "Submitting"}>Submit</button>
              </div>
        </form>
        
    </FormProvider>
  )
}

export default Form
