import React from "react";
import classNames from "classnames";

import { PageTitle, FlexContainer, FlexContainerProps, Column, Navbar } from "@/components";

import "./Page.scss"

export interface PageProps extends Partial<FlexContainerProps> {
  title?: string;
  withContainer?: boolean;
  className?: string;
  noPadding?: boolean;
  header?: React.ReactNode;
  showNavbar?: boolean;
  pageContentContainerProps?: Partial<FlexContainerProps>;
}

export const Page: React.FC<PageProps> = ({
  title,
  withContainer = true,
  showNavbar = true,
  className,
  children,
  direction = "column",
  noPadding,
  header,
  pageContentContainerProps,
  ...flexContainerProps
}) => {
  const { className: pageContentContainerClassName, ...pageContentContainerPropsRest } = pageContentContainerProps || {};

  return (
    <FlexContainer
      direction={direction}
      className={classNames("page", { 'with-navbar': showNavbar, }, className)}
      {...flexContainerProps}
    >
      {showNavbar && <Navbar />}
      {title && <PageTitle title={title} />}
      {header}
      <Column
        className={classNames("page--content", {
          'p-10': !noPadding
        }, pageContentContainerClassName)}
        {...pageContentContainerPropsRest}
      >
        {withContainer ? (
          <Column className="container">
            {children}
          </Column>
        ) : children}
      </Column>
    </FlexContainer>
  );
};
