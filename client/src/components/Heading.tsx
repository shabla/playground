import React from "react";
import classnames from "classnames";

export interface HeadingProps extends React.HTMLAttributes<HTMLDivElement> {
    inline?: boolean;
}

export const Heading: React.FC<HeadingProps> = ({ children, className, inline, ...props }) => {
    return (
        <div
            className={classnames(
                "Heading",
                "text-3xl font-bold text-indigo-500",
                { "mb-3": !inline, "inline-block": inline },
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export default Heading;
