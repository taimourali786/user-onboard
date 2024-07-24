export default function FormField({ htmlFor, labelText, value, isInvalid, errorMessage, handleChange, handleBlur, ...props }) {

    return (
        <div className="">
            <label htmlFor={htmlFor} className="block">{labelText}</label>
            <input
                onChange={handleChange}
                onBlur={handleBlur}
                value={value}
                {...props} />
            {isInvalid && <span>{errorMessage}</span>}
        </div>
    )
}