"use client"
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form';

const Form = () => {
    const methods = useForm()
  return (
    <FormProvider {...methods}>
        <form>
            
        </form>
    </FormProvider>
  )
}

export default Form
