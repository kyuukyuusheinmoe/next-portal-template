import React from 'react'
import StatusBadge from '../Badge/StatusBadge';
import { ColumnProps, KeyValueObject } from '@/app/types/common';
import { keyValueMap } from '@/app/utils/table.utils';
import { getDataFromFieldPath } from '@/app/utils/common';
import { amountFields } from '../../constants/common';

const DEFAULT_IMG = '/intro.png'

export type ActionProps = {label: string, action: (item: any) => void}
const ActionDropDown = ({actionList, data}: {actionList: ActionProps[], data: KeyValueObject}) => {
    return (<>{actionList?.length> 1 ? <div className="dropdown">
            <div tabIndex={0} role="button" className="btn m-1">Actions</div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 z-50 p-4 shadow">
                    {
                        actionList.map ((a, index)=> <li key={`${a.label}-${index}`}><button className="btn btn-sm btn-primary my-2" onClick={()=> a.action(data)}>{a.label}</button></li>)
                    }
                </ul>
            </div> : <button className="btn btn-sm btn-primary my-2" onClick={()=> actionList[0].action(data)}>{actionList[0].label}</button>}</>)
}

const rowDataFieldMapper = (column: ColumnProps, rowData: KeyValueObject, index: number) => {
    const value = keyValueMap({type: column.type, value: getDataFromFieldPath(column.field, rowData)}, index);
    switch(column.type) {
        case "status": return <StatusBadge value={value as string} />
        case "image" : return <img className="w-full h-24 object-cover" src={rowData.field || DEFAULT_IMG} alt={column.field} />
        default: return value && amountFields.includes(column.field) ?  value.toLocaleString("mmk"): value;
    }
}

export type TableProps =  {columns: ColumnProps[], data: KeyValueObject[], rowActionList?:ActionProps[]}

const Table = ({columns, data, rowActionList = []}: TableProps) => {
  return (
    <div className='w-full h-full overflow-x-auto'>
        <table className="table">
            <thead>
                <tr key="header" className='text-center'>
                    {
                        columns.map ((col, index) =>  <th key={`${col.label}-${index}`} className="text-sm">{col.label}</th>) 
                    }
                    {/** Actions */}
                    {rowActionList.length>0 && <th key="actions" className="normal-case"></th>}
                </tr>
                </thead>
                <tbody>
                    {
                        data.map((row: KeyValueObject, rowIndex:number) => {
                            return(
                                    <tr key={row._id}>
                                        {
                                            columns.map ((col, index)=> <td key={`${col.label}-${index} `} className='text-center'>{rowDataFieldMapper(col, row, rowIndex+1)}</td>)
                                        }
                                       {rowActionList.length>0 &&  <td key={"actions"}><ActionDropDown actionList={rowActionList} data={row}/></td> }
                                    </tr>
                                )
                            })
                    }
                    
                </tbody>
        </table>
    </div>
  )
}

export default Table
