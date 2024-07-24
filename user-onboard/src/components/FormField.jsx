export default function FormField({ htmlFor, labelText, value, isInvalid, errorMessage, handleChange, handleBlur, labelClassName, inputClassName, ...props }) {

    return (
        <div className="">
            <label htmlFor={htmlFor} className={labelClassName}>{labelText}</label>
            <input
                className={inputClassName}
                onChange={handleChange}
                onBlur={handleBlur}
                value={value}
                {...props} />
            {isInvalid && <span>{errorMessage}</span>}
        </div>
    )
}