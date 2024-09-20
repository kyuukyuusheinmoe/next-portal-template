
import { ComponentTypes } from '@/app/types/common';
import InputText, { InputTextProps } from '@/app/components/Input/InputText'
import MultipleSelect, { MultipleSelectProps } from '@/app/components/Select/MultipleSelect';
import SelectBox, { SelectBoxProps } from '../Select/SelectBox';
import Calendar, {CalendarProps} from '../Calendar/Calendar';
import Radio, {RadioGroupProps} from '../Radio/RadioGroup'
import Checkbox, {CheckboxProps} from '../Checkbox/Checkbox';
import DynamicGrid, {DynamicGridProps} from '../DynamicGrid/DynamicGrid';
import ImageUpload, {ImageUploadProps} from '../ImageUpload/ImageUpload';
import AutoCompleteSelect from '../Select/AutoCompleteSelect';
import { AutoCompleteSelectProps } from '../Select/AutoCompleteSelect';

export const FormElementMapper: Partial<{[key in ComponentTypes]: (props: any) => React.JSX.Element}> = {
    'input': (props: InputTextProps) => <InputText {...props} />,
    'multiSelect': (props: MultipleSelectProps) => <MultipleSelect {...props} />,
    'select': (props: SelectBoxProps) => <SelectBox {...props} />,
    'calendar': (props: CalendarProps) => <Calendar {...props} />,
    'radio': (props: RadioGroupProps) => <Radio {...props} />,
    'checkbox': (props: CheckboxProps) => <Checkbox {...props} />,
    "imageUpload": (props: ImageUploadProps) => <ImageUpload {...props} />,
    "dynamicGrid": (props: DynamicGridProps) => <DynamicGrid {...props} />,
    "autoCompleteSelect":(props: AutoCompleteSelectProps) => <AutoCompleteSelect {...props} />,
}