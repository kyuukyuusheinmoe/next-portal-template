import { CheckboxProps } from "../components/Checkbox/Checkbox";
import { DynamicGridProps } from "../components/DynamicGrid/DynamicGrid";
import { InputTextProps } from "../components/Input/InputText";
import { RadioGroupProps } from "../components/Radio/RadioGroup";
import { SelectBoxProps } from "../components/Select/SelectBox";
import { MultipleSelectProps } from "../components/Select/MultipleSelect";
import { CalendarProps } from "../components/Calendar/Calendar";
import { ImageUploadProps } from "../components/ImageUpload/ImageUpload";

export type KeyValueObject = {[key: string]: any}

export type PageProps = {params: {locale: string, }, searchParams: {[key: string]: string}}

export type ApiResponse<T> = { success: boolean,status?: number, data?: T; errorMsg?: string; }

export type ColumnProps = {label: string, field : string, type: string}

export type ComponentTypes = "input" | "select" | "multiSelect" | "calendar" | "radio" | "checkbox" | "container" | "dynamicGrid" | "imageUpload" | "collapse" | "autoCompleteSelect";

export type DataSourceTypes = "LIST" | "API";

export type DependencyState = "VISIBLE" | "AUTO-FILL";


export type DependencyProps = {
    field:string | string[];
    srcPath?:string;
    hasValue?: string;
    state: DependencyState
    valuePath?: string;
    calculatedValue?:string;
    customValue?:string;
}

export type ExternalDependencyProps = Omit<DependencyProps, "field"> & {source: string}
export type FormComponentProps = {
    control: any;
    name: string;
    label: string;
    dataType: string;
    containerClass?:string;
    itemClass?:string;
    autocomplete?:boolean;
    labelPosition?:string;
    placeholder?:string;
    componentStyleClass?:string;
    labelStyleClass?:string;
    componentType: ComponentTypes;
    hiddenLabel?:boolean,
    filter?:boolean,
    defaultValue?:string | Date | number;
    labelField?: string, 
    valueField?: string,
    disabled?:boolean,
    asSingle?:boolean,
    validations?:{required?:boolean},
    dataSource?: {
        type: DataSourceTypes,
        source?:string;
        srcPath?:string;
        dataPath?:string;
        url?: string;
        options?: KeyValueObject[]
    },
    components?: Omit<FormComponentProps, "control">[],
    dependency?: DependencyProps,
    defaultDataDependency?: ExternalDependencyProps,
    externalDependency?: ExternalDependencyProps,
    containerDependency?: ExternalDependencyProps,

}

export type ComponentProps<T extends ComponentTypes> = T extends 'input'
  ? InputTextProps
  : T extends 'multiSelect'
  ? MultipleSelectProps
  : T extends 'select'
  ? SelectBoxProps
  : T extends 'calendar'
  ? CalendarProps
  : T extends 'radio'
  ? RadioGroupProps
  : T extends 'checkbox'
  ? CheckboxProps
  : T extends 'imageUpload'
  ? ImageUploadProps
  : T extends 'dynamicGrid'
  ? DynamicGridProps
  : never;

export type FormLabelProps = {
    label:string;
    hiddenLabel?:boolean;
    labelStyleClass?: string;
    labelPosition?: "left" | "right";
    required?: boolean
}

export type DataTableProps =  {
    data: KeyValueObject[]
    columns: ColumnProps[]
    totalRows: number
}

