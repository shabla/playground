import React from "react";
import classNames from "classnames";

import { PageTitle, Navbar } from "@/components";

import "./Page.scss"

export interface PageProps {
  title?: string;
  navbar?: boolean;
  withContainer?: boolean;
  className?: string;
  containerClassName?: string;
}

export const Page: React.FC<PageProps> = ({
  title,
  navbar = true,
  withContainer = true,
  containerClassName,
  className,
  children,
}) => {
  return (
    <>
      {navbar && <Navbar />}

      <div className={classNames("page", { 'with-navbar': navbar }, className)}>
        {title && <PageTitle title={title} />}
        {withContainer ? (
          <div className={classNames("page__container", containerClassName)}>
            {children}
          </div>
        ) : (
          children
        )}
      </div>
    </>
  );
};
