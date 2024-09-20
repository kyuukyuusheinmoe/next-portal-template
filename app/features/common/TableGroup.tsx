"use client"

import React, { ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Export from './Export';
import Table, { ActionProps, TableProps } from '@/app/components/Table/Table';
import Pagination from '@/app/components/Table/Pagination';
import { FormComponentProps, KeyValueObject } from '@/app/types/common';
import SearchForm from '../search/SearchForm';
import { getFilterValues, getQueryString } from '@/app/utils/common';

export const DEFAULT_PAGE = 1, DEFAULT_ROW_PER_PAGE  = 10;

export type HeaderActionProps = ActionProps & {icon?: ReactNode};
export type TableGropProps = TableProps & {title: string; totalRows: number, headerActionList?:  HeaderActionProps[], filterComponents?: Omit<FormComponentProps, "control">[]}

const TableGroup = (props: TableGropProps) => {
    const {title, columns,headerActionList, rowActionList, data, totalRows, filterComponents = []} = props;
    const page = DEFAULT_PAGE;
    const size = DEFAULT_ROW_PER_PAGE;
    const pathName = usePathname()
    const router = useRouter()

    const handleSearch = (data: KeyValueObject) => {
      const filterValues = getFilterValues(data);
      const queryString = getQueryString ({page, size, ...filterValues})
      router.replace(`${pathName}${queryString}`)
    }

    const handleClearSearch = () => {
      router.replace(`${pathName}`)
    }

  return (
    <div>
            <div className="flex gap-4 flex-row-reverse">
                <Export columns={columns} data={data} title={title}/>
                {
                    headerActionList?.map ((a: HeaderActionProps, index: number)=> <button key={`${a.label}-${index}`} className="btn btn-primary py-2 text-sm" onClick={a.action}>{a.icon}{a.label}</button>)
                }
            </div>
            {filterComponents.length>0 && <SearchForm components={filterComponents} onSearch={handleSearch} onClear={handleClearSearch}/>}
            <div className="min-h-96">
                <Table columns={columns} data={data} rowActionList={rowActionList} />
            </div>
            <div className="flex justify-center pt-8">
                <Pagination totalRows={totalRows}/>
            </div>
    </div>
  )
}

export default TableGroup
