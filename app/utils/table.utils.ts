import { KeyValueObject } from "../types/common";
import { ColumnProps } from '@/app/types/common';
import moment from "moment";
import { getDataFromFieldPath } from "./common";

export const keyValueMap = (row: {type: string, value: string}, index?: number) => {
    switch(row.type) {
        case "index": return index;
        case "date": return moment(row.value).format("DD-MM-YYYY HH:MM:SS");
        default : return row.value;
    }
}

export const processTableData = (columns: ColumnProps[], data: KeyValueObject[]) => {
    return data.map ((d, index: number) => {
        return columns.reduce ((acc: KeyValueObject, column)=> {
            const value = getDataFromFieldPath(column.field, d)
            acc[column.field] = keyValueMap({type:column.type, value}, index+1)
            return acc;
        }, {})
    })
}