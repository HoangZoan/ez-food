import React from "react";
import PageHeaderLayout from "./PageHeaderLayout";

interface PageHeaderProps {
  isOnMainPage: boolean;
}

const PageHeader = ({ isOnMainPage }: PageHeaderProps) => {
  return (
    <PageHeaderLayout isOnMainPage={isOnMainPage}>
      <div className="container">abc</div>
    </PageHeaderLayout>
  );
};

export default React.memo(PageHeader);
