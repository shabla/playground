import React from "react";
import classNames from "classnames";

import appConfig from "@/appConfig";
import { PageTitle, FlexContainer, FlexContainerProps, Column } from "@/components";

import "./Page.scss"

export interface PageProps extends Partial<FlexContainerProps> {
  title?: string;
  withContainer?: boolean;
  className?: string;
  noPadding?: boolean;
  header?: React.ReactNode;
  navigation?: React.ReactNode;
}

export const Page: React.FC<PageProps> = ({
  title,
  withContainer = true,
  className,
  children,
  direction = "column",
  noPadding,
  header,
  navigation,
  ...flexContainerProps
}) => {
  return (
    <FlexContainer
      direction={direction}
      className={classNames("page", {
        'with-navbar': appConfig.showNavbar,
      }, className)}
      {...flexContainerProps}
    >
      {title && <PageTitle title={title} />}
      {header}
      {navigation}
      <Column className={classNames("page--content", {
        'p-10': !noPadding
      })}>
        {withContainer ? (
          <Column className="container">
            {children}
          </Column>
        ) : children}
      </Column>
    </FlexContainer>
  );
};
