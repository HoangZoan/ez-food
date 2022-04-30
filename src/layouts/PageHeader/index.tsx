import React from "react";
import PageHeaderLayout from "./PageHeaderLayout";

interface PageHeaderProps {
  isOnMainPage: boolean;
}

const PageHeader = ({ isOnMainPage }: PageHeaderProps) => {
  return (
    <PageHeaderLayout isOnMainPage={isOnMainPage}>PageHeader</PageHeaderLayout>
  );
};

export default React.memo(PageHeader);
