import { ReadonlyURLSearchParams } from 'next/navigation';
import { ApiResponse, KeyValueObject } from '../types/common';
import { amountFields } from '../constants/common';
import { ToastTypes } from '../contexts/ToastContext';

export const getColorForStatus = (status:any) => {
    switch(status) {
        case "active":
        case "paid":
            return '#28a745';
        case "pending": return '#FFC107';
        default: return '#8c8c8c'
    }
}

export const getQueryString = (queryObj : {[key: string]: string|number}) => {
    const queryList = Object.keys(queryObj);
    if (queryList.length) {
        const queryStr = queryList.reduce((acc: string, item, index)=> {
            acc = acc + `${item}=${queryObj[item]}${index < queryList.length-1 ? "&": ""}`
            return acc;
        }, "")
        return "?" + queryStr;
    }
    return ""
}

export const getQueryFromReadOnlySearchParams = (searchParams : ReadonlyURLSearchParams, nameList: string[]) => {
    let query : KeyValueObject = {};
    nameList.forEach((name) => {
        if (name === 'createdAt') {
            query['startDate'] = searchParams.get('createdAt.startDate'); 
            query['endDate'] = searchParams.get('createdAt.endDate'); 
        } else {
            query[name] = searchParams.get(name);
        }
    });
    return query;
}

export const getQueryFromSearchParams = (searchParams: {[key: string]: string} ) => {
   return Object.keys(searchParams).reduce((acc, key) => {
        if (key.includes('createdAt')) {
            acc["startDate"]=searchParams['createdAt.startDate']
            acc["endDate"]=searchParams['createdAt.endDate']

        } else {
            acc[key] = searchParams[key] || ""
        }
        return acc;
      }, {} as KeyValueObject);
}

export const getFeatureNameFromPath = (path: string) => {
    const pathLength = path.split('/')
    return pathLength.length>0 ? pathLength[pathLength.length-1] : path;
}

export const getDataFromFieldPath = (field: string, data: KeyValueObject): any => {
    if (!field) return null;

    if (field.includes('.')) {
        const pathArr = field.split('.')
        return pathArr.reduce((acc: any, item)=> acc && (amountFields.includes(item) ? acc[item].toLocaleString("mmk"): acc[item]), data)
    }
    return amountFields.includes(field) ?  data[field].toLocaleString("mmk") :  data[field];
}

export const getFilterValues = (data: KeyValueObject) => {
    const filterKeys = Object.keys(data).filter(key=> data[key] !== undefined)
    const filterParams = filterKeys.reduce((acc, key)=> 
        {
            if (data[key]) {
                switch(key) {
                    case 'createdAt': {
                        acc['startDate'] = data[key].startDate
                        acc['endDate'] = data[key].endDate
                    };break;
                    default: acc[key] = data[key]; 
                }
            }
            return acc;
        
        }, {} as KeyValueObject)

    return filterParams;
}


export const  evaluateStringExpression = (
    expression: string,
    formData: KeyValueObject
  ): number | null => {
    try {
      // Replace the variables in the expression with their corresponding values from the formData
      const substitutedExpression = expression.replace(/\b\w+\b/g, (match) => {
        if (formData.hasOwnProperty(match)) {
          return formData[match].toString();
        } else {
          throw new Error(`Variable "${match}" not found in form data`);
        }
      });
      const arithmathicExpressRegex = /^\s*[-+]?(\(*\s*[-+]?(\d+(\.\d+)?)(\s*[-+*/]\s*[-+]?(\(*\d+(\.\d+)?\)*))*\s*\)*)\s*$/;

      // Check if the substituted expression contains only valid characters
      if (arithmathicExpressRegex.test(substitutedExpression)) {
        // Safely evaluate the substituted expression
        const result = new Function(`return (${substitutedExpression});`)();
        return typeof result === "number" ? result : null;
      } else {
        throw new Error("Invalid characters in the substituted expression");
      }
    } catch (error) {
      console.error("Error evaluating expression:", expression, formData);
      return null;
    }
}

export const evaluateCustomizeValue = (customFun: string, dataObj: any) => {
    Object.keys(dataObj).forEach(k=> {
        if (dataObj[k] instanceof Map) {
            dataObj[k] = JSON.stringify(formatMapToArr(dataObj[k]))
        }
    })
    const args = Object.keys(dataObj).join(',');
    const values = Object.values(dataObj);

    const dynamicFunc = new Function(args, `return ${customFun}`) 
    const result = dynamicFunc(...values);

    return result;
}

export const formatArrToMap = <T>(items: T[]):Map<number, T> => {
    const itemsMap = new Map()

    items.forEach((item, index) => {
        itemsMap.set(index, item)
    });

    return itemsMap;
}

export const formatMapToArr = <T>(items: Map<number, T>): T[] => [...items?.entries()].map(([key, value]) => value)

export const getToastValue = (res: {success: boolean, errorMsg?:string}) => {
    return ({type: res.success ? "success" : "error" as ToastTypes, text: res.success ? "Success" : res?.errorMsg || "Something went wrong"})
}