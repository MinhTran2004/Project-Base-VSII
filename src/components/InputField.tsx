import React from "react";

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

const InputField: React.FC<InputProps> = ({
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
}) => {
    const style = {
        width,
        height,
    };

    return (
        <div className="mb-2">
            <label htmlFor={id || name} className="form-label">
                <h6>{label}</h6>
            </label>
            <input
                type={type}
                name={name}
                id={id || name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className={`form-control ${error ? "is-invalid" : ""}`}
                style={style}
                {...rest} // Cho phép thêm thuộc tính bổ sung
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export default InputField;
