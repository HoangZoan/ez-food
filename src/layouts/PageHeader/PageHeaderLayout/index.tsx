import React, { useEffect, useState } from "react";

import classes from "./index.module.scss";

interface PageHeaderProps {
  isOnMainPage: boolean;
  children: React.ReactNode;
}

const PageHeader = ({ isOnMainPage, children }: PageHeaderProps) => {
  const [bgColor, setBgColor] = useState("");
  const [shadow, setShadow] = useState("");
  const toolbarClasses = `${classes.toolbar} ${bgColor} ${shadow}`;

  useEffect(() => {
    if (isOnMainPage && !shadow) {
      setBgColor("bg-clear");
    } else {
      setBgColor("bg-dark");
    }
  }, [isOnMainPage, shadow]);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = document.documentElement.scrollTop;

      if (scrollTop === 0) {
        setShadow("");
      } else {
        setShadow("shadow");
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div className={toolbarClasses}>{children}</div>;
};

export default React.memo(PageHeader);
