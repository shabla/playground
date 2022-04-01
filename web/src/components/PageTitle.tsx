import React, { useEffect } from "react";

export type PageTitleProps = {
  title: string;
};

export const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  useEffect(() => {
    document.title = `${title} · My Cool App`;
  }, [title]);

  return null;
};