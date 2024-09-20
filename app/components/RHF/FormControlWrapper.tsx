"use client"
import React, {useEffect, useState} from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { FormComponentProps, KeyValueObject } from '@/app/types/common';
import { useTranslation } from '@/app/i18n/client';
import { useCookies } from 'react-cookie';
import { getDataFromFieldPath, evaluateStringExpression, evaluateCustomizeValue } from '@/app/utils/common';
import { fetcher } from '@/services/axiosInstance';

type FormControlWrapperProps = 
   FormComponentProps & {
    render: (options: KeyValueObject[], labelField: string, searchTerm?:string | null, onSearchTermChange?:(value:string)=> void ) => React.JSX.Element;
  };

const FormControlWrapper = (props: FormControlWrapperProps) => {
  const {name, dataSource,labelField, dependency,render, autocomplete} = props;
  const {t} = useTranslation()
  const {setValue, control, formState: {errors}} = useFormContext()
  const [searchTerm, setSearchTerm] = useState<string| null>(null)

  const formatLabel = (data: KeyValueObject[]) => data?.map((d: KeyValueObject)=> labelField ?({...d, [labelField]: t(d[labelField])}) : d)

  const [options, setOptions] = useState<KeyValueObject[]>([]);
  const [visible, setVisible] = useState(true);
  const watchValue = dependency ? typeof dependency.field === 'string' ? useWatch({control, name:  dependency.field}) : useWatch({control, name:  [...dependency.field]}) : null;
  const [cookies] = useCookies(['user']);

  const getOptions = async (url: string) => {
    try {
      const res = await fetcher(url)
      if (res.status === 200) {
        setOptions(dataSource?.dataPath ? res?.data?.data?.[dataSource.dataPath] || [] : res?.data?.data && formatLabel(res.data.data) || [])
      }
    } catch (error) {
      return;
    }
  }

  //Handle Logic for dynamic options
  useEffect(()=> {
    if (autocomplete) return;
    if (dataSource?.type === "API" && dataSource?.url) {
      getOptions(dataSource?.url)
    } else if (dataSource?.source === "cookies" && dataSource?.srcPath) {
      const newOptions = getDataFromFieldPath(dataSource.srcPath as string, cookies)
      if (newOptions?.length) {
        setOptions(newOptions)
      }
    } else {
      const newOptions = dataSource?.options && formatLabel(dataSource?.options) 
      newOptions?.length && setOptions(newOptions)
    }
  }, [dataSource?.type])

  //Handle Logic for autcomplete element
  useEffect(()=> {
    const debounceTimeout = setTimeout(()=> {
      if (typeof searchTerm === 'string' && searchTerm.length >2) {
        if (dataSource?.type === "API" && dataSource?.url) {
          getOptions(`${dataSource.url}?input=${searchTerm}`)
        }
      } else if ( typeof searchTerm === 'string' && searchTerm.length === 0) {
        setOptions([])
      } 
    }, 500)
  
  return ()=> {
    clearTimeout(debounceTimeout);
  }
  }, [ searchTerm])

  //Handle Logic for VISIBLE or AUTO-FILL form value
  useEffect(()=> {
    if (dependency?.state === "VISIBLE") {
      setVisible(dependency.hasValue === watchValue)
    } else if (dependency && dependency?.state === "AUTO-FILL" && watchValue){
      const dataObj = typeof dependency.field === "string" ? {[dependency.field]: watchValue} : dependency.field.reduce((acc, k, index)=> {acc[k]= watchValue[index] ? watchValue[index] instanceof Date ? watchValue[index] : +watchValue[index] : 0; return acc;}, {} as KeyValueObject)

      if (dependency.calculatedValue) {
          if (!watchValue.includes(undefined)) {
            const calculatedVal = evaluateStringExpression(dependency.calculatedValue, dataObj)
            setValue(name, calculatedVal)
          } 
      } else if (dependency.customValue) {
        
        const customizedValue = evaluateCustomizeValue(dependency.customValue, dataObj)
        setValue(name, customizedValue)
      } else {
        setValue(name, dependency.valuePath ? getDataFromFieldPath(dependency.valuePath, dataObj) : watchValue)
      }
    }
  }, [watchValue])

  const handleSearchTermChange = (searchInput: string) => {
    setSearchTerm(searchInput)
  }

  return (
    <div>
        {visible && render(options, labelField || "label" as string, searchTerm, handleSearchTermChange)}
        {errors[name]?.message && <span className="error-message">{errors[name].message as string}</span>}
    </div>
  )
}

export default FormControlWrapper
