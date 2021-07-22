import React from "react";
import classnames from "classnames";

import { PageTitle, Navbar } from "components";

export interface PageWithNavbarProps {
    title?: string;
    withContainer?: boolean;
    containerClassName?: string;
}

export const PageWithNavbar: React.FC<PageWithNavbarProps> = ({
    title,
    withContainer = true,
    containerClassName,
    children,
}) => {
    return (
        <>
            <Navbar />
            {title && <PageTitle title={title} />}
            {withContainer ? (
                <div
                    className={classnames(
                        "container mx-auto p-2 min-h-full",
                        containerClassName
                    )}
                >
                    {children}
                </div>
            ) : (
                children
            )}
        </>
    );
};

export default PageWithNavbar;
