import React from "react";
import classNames from "classnames";

import appConfig from "@/appConfig";
import { PageTitle, FlexContainer, FlexContainerProps } from "@/components";

import "./Page.scss"

export interface PageProps extends Partial<FlexContainerProps> {
  title?: string;
  withContainer?: boolean;
  className?: string;
  containerClassName?: string;
}

export const Page: React.FC<PageProps> = ({
  title,
  withContainer = true,
  containerClassName,
  className,
  children,
  ...flexContainerProps
}) => {
  return (
    <>
      <FlexContainer
        className={classNames("page", { 'with-navbar': appConfig.showNavbar }, className)}
        direction="column"
        {...flexContainerProps}
      >
        {title && <PageTitle title={title} />}
        {withContainer ? (
          <div className={classNames("page__container", containerClassName)}>
            {children}
          </div>
        ) : (
          children
        )}
      </FlexContainer>
    </>
  );
};
