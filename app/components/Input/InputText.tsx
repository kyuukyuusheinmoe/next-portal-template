type InputTextProps = {name?: string, labelTitle: string, labelStyle?: string, type: string, containerStyle: string, defaultValue?: string, placeholder?: string}

function InputText({labelTitle, labelStyle, type, containerStyle, placeholder, name}: InputTextProps){

    return(
        <div className={`form-control w-full ${containerStyle}`}>
            <label className="label">
                <span className={"label-text text-base-content " + labelStyle}>{labelTitle}</span>
            </label>
            <input type={type || "text"} name={name} placeholder={placeholder || ""} className="input  input-bordered w-full " />
        </div>
    )
}


export default InputText