'use client'

import { ReactNode } from 'react'
import useSWR from 'swr'
import { ColumnProps, KeyValueObject } from '@/app/types/common'
import { getDataFromFieldPath, getFeatureNameFromPath } from '@/app/utils/common'
import { keyValueMap } from '@/app/utils/table.utils'
import { fetchTransactionDetailsByCode, fetchTransactionDetailsById } from '../../../services/transactionServices';
import OverlayLoading from '@/app/components/loading/OverlayLoading'
import Table from '@/app/components/Table/Table'
import StatusBadge from '@/app/components/Badge/StatusBadge'
import { useTranslation } from '@/app/i18n/client'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import paymentService from '@/services/paymentServices';
import customerService from '@/services/customerServices';
import FormLabel from '@/app/components/Typography/FormLabel'
import clsx from 'clsx'

const DEFAULT_IMG = '/intro.png'

type GropObjProps = {label:string, type: string, value?: any, field?: string, fields?: GropObjProps[] | null, columns?: ColumnProps[]};

const DataListComponent = ({groupObj}: {groupObj: GropObjProps & {columns: ColumnProps[]}}) => {
  const {label, value, columns} = groupObj;
  const {t} = useTranslation()
  return (<div className="py-3">
            <dt className="text-gray-600 font-bold">{t(label)}</dt>
            <dd>
              {value ? <Table columns={columns} data={value}/> : "No Data"}
            </dd>
          </div>
        )
}

const DataGroupComponent = ({groupObj}: {groupObj: GropObjProps & {fields: {label: string, value: any}[]}}) => {
  const {label, fields} = groupObj
  const {t} = useTranslation()

  return (<div className='card w-full shadow-xl p-4 h-full'>
            <dt className="text-gray-600 font-bold">{t(label)}</dt>
            {fields.map (field=> DataComponentMapper(field))}
          </div>)
}

const DataComponentMapper = (groupObj: GropObjProps) => {
  switch(groupObj.type) {
    case "coverImage": return (<CoverImageComponent groupObj={groupObj} />)
    default: return <DefaultDataComponet  groupObj={groupObj}/> 
  }
}

const DefaultDataComponet = ({groupObj}: {groupObj: GropObjProps}) => {
  const {label, value, type} = groupObj;
  const {t} = useTranslation()

  return (<div className="py-3 flex justify-between items-start border-b-[0.1px]">
            <dt className=" text-gray-600 font-medium">{t(label)}</dt>
            <dd className="text-sm"> {type === "status" ? <StatusBadge value={value}/>: type=== "boolean" ? value ? "Yes" : "No" : value} </dd>
          </div>)
}

const CoverImageComponent = ({groupObj}: {groupObj: GropObjProps}) => {
  console.log ('xxx CoverImageComponent ', groupObj)
  const {value} = groupObj;
  return (
    <div className='w-full h-full relative'> <Image src={DEFAULT_IMG} alt="Item Image" className="w-full h-full object-cover" layout='fill'/></div>
  )
}

const DetailsDataComponentMapper = (groupObj: GropObjProps): ReactNode => {
  switch(groupObj.type) {
      case "dataList" : return (<DataListComponent groupObj={{...groupObj, field: groupObj.field as string, columns: groupObj.columns as ColumnProps[]}}/>)
      case "group": return (<DataGroupComponent groupObj={{...groupObj, fields: groupObj.fields as {label: string, value: any, type: string}[]}}/>)
      case "singleCoverImage": return (<><FormLabel label={(groupObj.label)} ></FormLabel><div className='md:w-1/3 w-full aspect-square'><CoverImageComponent groupObj={{...groupObj, fields: groupObj.fields as {label: string, value: any, type: string}[]}}/></div></>)
      
      default: null;
    };
}

const DetailsComponent = ({details, fieldGroups}: {details: KeyValueObject, fieldGroups: KeyValueObject[]}) => {
  const pathName = usePathname()
  const feature = getFeatureNameFromPath(pathName)

  const fetcherService = (id: string) => {
    switch(feature) {
      case "interests":
      case "claims": return paymentService.getDetails(id);
      case "transactions": return fetchTransactionDetailsById(id);
      case "customers": return customerService.getDetails(id);
      default: return null;
    }
  }

  const {isLoading, data, error} = useSWR(feature !== "losts" && details._id ? details._id : null, fetcherService)

  const detailsData = feature === "losts" ? details : data?.data || null;

  console.log ('xxx detailsData ', detailsData)

  const formatLabelValue: GropObjProps[] = detailsData ? fieldGroups.map((d: KeyValueObject) => {
    if (d.type === "group") {
      return ({...d, fields: d.fields?.map((d: KeyValueObject) => ({...d, value: keyValueMap({type: d.type, value: d.field ? getDataFromFieldPath(d.field, detailsData as KeyValueObject): {}})}))} as GropObjProps)
    } else {
      return ({...d, value: keyValueMap({...d, type: d.type as string, value: d?.field ? getDataFromFieldPath(d.field, detailsData as KeyValueObject): {}})} as GropObjProps)
    }
    
  }) : []
  
  if (isLoading) {
    return <OverlayLoading />
  }

  if (error) return <div>Failed to load details data.</div>;

  return (
    <div className='min-h-60'>
      {detailsData && <>
        <div className={clsx(formatLabelValue.filter(fg=> fg.type === "group").length>1 ? "grid md:grid-cols-2 grid-cols-1 md:gap-8 place-content-center" : "", )}>
          {formatLabelValue.filter(fg=> fg.type === "group").map((field: GropObjProps, index) => (
              <div key={`${field.label}-${index}`} className="col-span-1">
                {DetailsDataComponentMapper(field)}
              </div> 
          ))}
        </div>
        {
          formatLabelValue.filter(fg=> fg.type !== "group").map((field: GropObjProps, index) => (
            <div key={`${field.label}-${index}`}>
                {DetailsDataComponentMapper(field)}
              </div> 
          ))
        }
      </>}
    </div>
  )
}

export default DetailsComponent

