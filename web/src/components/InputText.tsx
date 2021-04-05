import React from "react";
import classnames from "classnames";

export interface InputTextProps extends React.HTMLAttributes<HTMLInputElement> {
    autoComplete?: boolean;
    disabled?: boolean;
}

export const InputText: React.FC<InputTextProps> = ({ className, disabled, autoComplete, ...props }) => {
    return (
        <input
            className={classnames(
                "InputText",
                "rounded border px-2 py-1 border-indigo-500 w-full",
                className
            )}
            disabled={disabled}
            autoComplete={!autoComplete ? "new-password" : undefined}
            {...props}
        />
    );
};

export default InputText;