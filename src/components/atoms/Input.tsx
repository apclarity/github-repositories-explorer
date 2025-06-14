import { forwardRef } from "react";
import { InputProps } from "../../types";

const Input = forwardRef<HTMLInputElement, InputProps> (({
    onChange,
    onKeyDown,
    placeholder,
    className = "",
    ...rest
}, ref) => {
    const baseClass = "px-4 py-2 border border-gray-300 rounded-md shadow"

    return (
        <input
            ref={ref}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            className={`${baseClass} ${className}`}
            {...rest}
        />
    );
});

export default Input;