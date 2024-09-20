import React from 'react'

export type CheckboxProps= {
    label?:string,
    value?: boolean,
    onChange: ()=> void
}
const Checkbox = ({label,value, onChange, }: CheckboxProps) => {
  return (
    <div className="form-control">
    <label className="cursor-pointer label justify-normal gap-2 ">
        <input type="checkbox" checked={value} className="checkbox checkbox-primary" onChange={onChange}/>
        <span className="label-text">{label}</span>
    </label>
    </div>
  )
}

export default Checkbox
