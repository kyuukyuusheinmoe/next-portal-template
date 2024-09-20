"use client"
import React from 'react';
import { ColumnProps } from '@/app/types/common';
import TableGroup from '../common/TableGroup';


type DataTableProps = {
    data: {[key: string]: any}[]
    columns: ColumnProps[]
    totalRows: number
}

function DataTable({data=[], columns=[], totalRows}: DataTableProps){
    
    return(
        <>
            <TableGroup title='Transaction List' columns={columns} data={data} filterComponents={[]}  totalRows={totalRows} rowActionList={[]} headerActionList={[]}/>
        </>
    )
}

export default DataTable