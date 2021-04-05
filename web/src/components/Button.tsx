import React from "react";
import classnames from "classnames";

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    fill?: boolean;
    type?: "button" | "submit";
    disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    fill,
    className,
    type = "button",
    disabled,
    children,
    ...props
}) => {
    return (
        <button
            type={type}
            disabled={disabled}
            className={classnames(
                "Button",
                "no-border bg-indigo-500 px-6 py-2 rounded text-white",
                className,
                {
                    "w-full": fill,
                }
            )}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
