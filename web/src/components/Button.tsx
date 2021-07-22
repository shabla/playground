import React from "react";
import classnames from "classnames";

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    fill?: boolean;
    type?: "button" | "submit";
    size?: "xs" | "sm" | "md" | "lg";
    noBg?: boolean;
    disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    fill,
    className,
    type = "button",
    size = "md",
    disabled,
    noBg = false,
    children,
    ...props
}) => {
    return (
        <button
            type={type}
            disabled={disabled}
            className={classnames("Button", "no-border rounded", className, {
                "w-full": fill,
                "px-4 py-1 text-sm": size === "sm",
                "px-6 py-2 text-md": size === "md",
                "px-6 py-3 text-lg": size === "lg",
                "bg-indigo-500 text-white": !noBg,
            })}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
