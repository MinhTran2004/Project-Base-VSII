import React, { forwardRef } from "react";

interface InputProps {
    label: string;
    name: string;
    value: string;
    placeholder?: string;
    width?: string;
    height?: string;
    error?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    id?: string;
    [key: string]: any;
}

const InputField = forwardRef<HTMLInputElement, InputProps>(({
    label,
    name,
    value,
    placeholder = "",
    width = "auto",
    height = "auto",
    error,
    onChange,
    type = "text",
    id,
    ...rest
}, ref) => {
    const style = {
        width,
        height,
    };

    return (
        <div className="mb-2">
            <label htmlFor={id || name} className="form-label mt-1">
                <h6 className="mb-1">{label}</h6>
            </label>
            <input
                ref={ref} // Forward ref tới phần tử input
                type={type}
                name={name}
                id={id || name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className={`form-control ${error ? "is-invalid" : ""}`}
                style={style}
                {...rest} 
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
});

export default InputField;
