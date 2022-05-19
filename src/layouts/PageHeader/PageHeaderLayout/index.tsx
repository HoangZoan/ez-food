import { useEffect, useState } from "react";
import { AppBar, Toolbar } from "@mui/material";
import { useLocation } from "react-router-dom";

const PageHeader = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const isMainPage = pathname === "/";
  const [isOnTop, setIsOnTop] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = document.documentElement.scrollTop;

      if (scrollTop === 0) {
        setIsOnTop(true);
      } else {
        setIsOnTop(false);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AppBar
      sx={{
        backgroundColor:
          isMainPage && isOnTop ? "transparent" : "secondary.main",
        transition: "background-color 0.3s box-shadow 0.3s",
      }}
      elevation={isOnTop ? 0 : 3}
    >
      <Toolbar>{children}</Toolbar>
    </AppBar>
  );
};

export default PageHeader;
