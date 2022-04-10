import React from "react";
import classNames from "classnames";

import appConfig from "@/appConfig";
import { PageTitle, FlexContainer, FlexContainerProps } from "@/components";

import "./Page.scss"

export interface PageProps extends Partial<FlexContainerProps> {
  title?: string;
  withContainer?: boolean;
  className?: string;
}

export const Page: React.FC<PageProps> = ({
  title,
  withContainer = true,
  className,
  children,
  direction = "column",
  ...flexContainerProps
}) => {
  return (
    <FlexContainer
      className={classNames("page", {
        'with-navbar': appConfig.showNavbar,
        'page--container': withContainer,
      }, className)}
      direction={direction}
      {...flexContainerProps}
    >
      {title && <PageTitle title={title} />}
      {children}
    </FlexContainer>
  );
};
