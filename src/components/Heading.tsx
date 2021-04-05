import React from "react";
import classnames from "classnames";

export const Heading: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    children,
    className,
    ...props
}) => {
    return (
        <div
            className={classnames("Heading", "text-3xl font-bold text-indigo-500 mb-3", className)}
            {...props}
        >
            {children}
        </div>
    );
};

export default Heading;
