"use client"
import {useEffect} from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import FormControlElement from '@/app/components/RHF/FormControlElement';
import { FormComponentProps, KeyValueObject } from '@/app/types/common';
import { useSearchParams } from 'next/navigation';
import { getQueryFromReadOnlySearchParams } from '@/app/utils/common';
import clsx from 'clsx';

export type SearchFormProps = {
    components: Omit<FormComponentProps, "control">[];
    onSearch: (data: KeyValueObject) => void
    onClear: () => void
}

const SearchForm = ({components, onSearch, onClear}: SearchFormProps) => {
    const searchParams = useSearchParams();
    const queryValues = getQueryFromReadOnlySearchParams (searchParams, components.map (comp => comp.name));

    const methods = useForm({defaultValues: queryValues})
    const {handleSubmit, control, reset} = methods;

    useEffect(() => {
        reset({
            ...queryValues
        })
        }, [searchParams])

    const hanleSearchClear = () => {
        onClear()
    }

  return (
    <div className='card shadow-sm'>
        <div className="card-body p-4">
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSearch)}>
                    <div className="grid grid-cols-3 gap-4">
                        {
                            components?.map ((component, index)=> <div key={`${component.name}-${index}`} className='col-span-1'><FormControlElement key={`${component.name}-${index}`} {...component} control={control}  /></div>)
                        }
                        <div className={clsx("col-span-1 flex gap-4 items-end", components.length%3 === 0 && "col-span-3 justify-end")}>
                            <button type="submit" className={"btn mt-2 btn-primary"}>Search</button>
                            <button type="button" className={"btn mt-2 btn-error"} onClick={hanleSearchClear}>Clear</button>
                        </div>
                    </div>
                    
                </form>
            </FormProvider>
        </div>
    </div>
  )
}

export default SearchForm
