import React from "react";
import PageHeaderLayout from "./PageHeaderLayout";
import MenuButton from "./MenuButton";

import classes from "./index.module.scss";

interface PageHeaderProps {
  isOnMainPage: boolean;
}

const PageHeader = ({ isOnMainPage }: PageHeaderProps) => {
  const toolbarWrapperClasses = `${classes["toolbar-wrapper"]} container`;

  return (
    <PageHeaderLayout isOnMainPage={isOnMainPage}>
      <div className={toolbarWrapperClasses}>
        <MenuButton />

        <div className="centered-content white">LOGO</div>

        <div>Tools</div>
      </div>
    </PageHeaderLayout>
  );
};

export default React.memo(PageHeader);
