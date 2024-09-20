import clsx from 'clsx';
import React, { ReactNode } from 'react'

type ButtonProps = {
    type: "submit" | "button" | "reset";
    label: string;
    disabled?: boolean;
    loading?: boolean;
    btnStyleClass?: string;
    lableStyleClass?:string;
    icon?:ReactNode;
    btnPosition?: "left" | "right"
}
const Button = (props: ButtonProps) => {
    const {type,label, disabled=false, loading=false, icon, btnPosition="left"} = props;
  return (
    <button type={type} disabled={disabled} aria-disabled={disabled} className={clsx("btn mt-2 w-full btn-primary flex gap-4", disabled && "!text-gray-300 !bg-primary")}>
       <div className={clsx(btnPosition === "right" ? "flex flex-row-reverse" : "flex" )}>
        {icon}
        <span>{label}</span> 
       </div>
       {loading && <span className="loading loading-spinner text-gray-300"></span>}
    </button>
  )
}

export default Button
