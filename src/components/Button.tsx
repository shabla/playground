import React from "react";
import classnames from "classnames";

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    fill?: boolean;
    type?: "button" | "submit";
}

export const Button: React.FC<ButtonProps> = ({ fill, className, type = "button", children, ...props }) => {
    return (
        <button
            type={type}
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
