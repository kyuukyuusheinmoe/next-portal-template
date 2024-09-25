"use client"
import React, {useState} from 'react';
import { ColumnProps } from '@/app/types/common';
import TableGroup from '../common/TableGroup';
import { InboxArrowDownIcon } from '@heroicons/react/24/outline';
import { CASH_IN, CASH_OUT } from '@/app/constants/common';
import Dialog from '@/app/components/Dialog/Dialog';
import FormComponent from './FormComponent';

type DataTableProps = {
    data: {[key: string]: any}[]
    columns: ColumnProps[]
    totalRows: number
}


function DataTable({data=[], columns=[], totalRows}: DataTableProps){
    const [isDialogOpen, setIsDialogOpen] = useState<typeof CASH_IN | typeof CASH_OUT | null>(null)

    const cashinDialogOpen = isDialogOpen === CASH_IN;

    const headerActionList = [
        {
            label: "Cash In",
            icon: <InboxArrowDownIcon className='w-6 h-6' />,
            action: () => setIsDialogOpen(CASH_IN)
        }
    ]
    const handleDialogClose = () => {
        setIsDialogOpen(null)
    }

    return(
        <>
            <TableGroup title='Transaction List' columns={columns} data={data} filterComponents={[]}  totalRows={totalRows} rowActionList={[]} headerActionList={headerActionList}/>
            <Dialog title='Cash In/Out' isOpen={cashinDialogOpen} onClose={handleDialogClose} sizeClass="w-md min-h-[57vh]">   
                {cashinDialogOpen && <FormComponent actionAfterSubmit = {handleDialogClose}/>}
            </Dialog>
        </>
    )
}

export default DataTable