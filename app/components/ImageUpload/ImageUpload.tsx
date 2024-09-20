import React, {ChangeEventHandler} from 'react'
import FormLabel from "../Typography/FormLabel";
import { FormLabelProps } from "@/app/types/common";
import clsx from "clsx";

export type ImageUploadProps = FormLabelProps&{
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>
}

const ImageUpload = (props: ImageUploadProps) => {
  const {label, value, onChange, hiddenLabel, labelPosition,labelStyleClass} = props;
  return (
    <div className={clsx('form-control w-full', labelPosition === 'right' && 'flex flex-row-reverse')}>
            <FormLabel label={label} hiddenLabel={hiddenLabel} labelStyleClass={labelStyleClass} />
        <input
            type="file"
            className="file-input file-input-bordered w-full"
            onChange={onChange}
        />
    </div>
  )
}

export default ImageUpload
