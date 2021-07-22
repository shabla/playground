import React from "react";

import { PageTitle, Navbar } from "components";

export interface PageWithNavbarProps {
    title?: string;
    withContainer?: boolean;
}

export const PageWithNavbar: React.FC<PageWithNavbarProps> = ({
    title,
    withContainer = true,
    children,
}) => {
    return (
        <>
            <Navbar />
            {title && <PageTitle title={title} />}
            {withContainer ? <div className="container mx-auto p-2 pt-16 min-h-screen">{children}</div> : children}
        </>
    );
};

export default PageWithNavbar;
