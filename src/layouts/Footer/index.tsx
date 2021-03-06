import {
  AppBar,
  Toolbar,
  Container,
  Grid,
  Box,
  Typography,
  List,
  ListItem as MuiListItem,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import logo from "shared/images/logo.svg";
import { styled } from "shared/theme";
import { menuState } from "states/menu";

const ListItem = styled(MuiListItem)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  padding: "0.3rem 0",
  ...theme.typography.body1,
  "&:first-of-type": {
    paddingTop: 0,
  },
  "& .link-title": {
    width: "10rem",
  },
  "&.menu-link, & .link-text": {
    transition: "all 0.2s",
  },
  "&:hover.menu-link, &:hover .link-text": {
    color: theme.palette.primary.main,
  },
}));

const ListItemHeading = styled(ListItem)({
  textTransform: "uppercase",
  fontSize: "2rem",
});

const Footer = () => {
  const { pathname } = useLocation();
  const pathRef = useRef(pathname);
  const menu = useRecoilValue(menuState);
  const [show, setShow] = useState(false);

  const handleMenuClick = () => {
    if (pathRef.current === window.location.pathname) {
      document.documentElement.scroll({ top: 0, behavior: "smooth" });
    } else {
      pathRef.current = window.location.pathname;
    }
  };

  useEffect(() => {
    if (pathname.indexOf("login") !== -1 || pathname.indexOf("admin") !== -1) {
      setShow(true);
      return;
    }

    const timeout = setTimeout(() => {
      setShow(true);
    }, 400);

    return () => {
      clearTimeout(timeout);
      setShow(false);
    };
  }, [pathname]);

  if (!show) {
    return null;
  }

  return (
    <AppBar
      sx={{
        backgroundColor: "secondary.main",
      }}
      component="footer"
      position="relative"
    >
      <Toolbar>
        <Container sx={{ color: "white", py: 8 }}>
          <Grid
            container
            justifyContent={{ lg: "space-between" }}
            columnGap={{ md: 12, lg: 0 }}
            rowGap={6}
            sx={{ mb: 6 }}
          >
            <Grid item xs={12} md="auto">
              <List sx={{ p: 0 }}>
                <ListItemHeading>Th??ng tin li??n h???</ListItemHeading>
                <ListItem>C???a h??ng kinh doanh ????? ??n nhanh EZ Food</ListItem>
                <ListItem>
                  <span className="link-title">?????? Hotline:&nbsp;</span>
                  <a className="link-text" href="tel:037.982.6688">
                    037.982.6688
                  </a>
                </ListItem>
                <ListItem>
                  <span className="link-title">?????? Email:&nbsp;</span>
                  <a className="link-text" href="mailto:support@ez-food.com">
                    support@ez-food.com
                  </a>{" "}
                </ListItem>
              </List>
            </Grid>

            <Grid item xs={12} md="auto">
              <List sx={{ p: 0 }}>
                <ListItemHeading>Th???c ????n</ListItemHeading>
                {menu.map(({ title, value }) => (
                  <ListItem
                    key={value}
                    className="menu-link"
                    onClick={handleMenuClick}
                  >
                    <Link to={"/products/" + value}>{title}</Link>
                  </ListItem>
                ))}
              </List>
            </Grid>

            <Grid item xs={12} md="auto">
              <List sx={{ p: 0 }}>
                <ListItemHeading>C??c c?? s???</ListItemHeading>
                <ListItem>
                  C?? s??? 1: S??? 11, ph??? Nguy???n Kh???c C???n, qu???n Ho??n Ki???m, H?? N???i
                </ListItem>
                <ListItem>
                  C?? s??? 2: S??? 93, ph??? Giang V??n Minh, qu???n Ba ????nh, H?? N???i
                </ListItem>
                <ListItem>
                  C?? s??? 3: S??? 131, ???????ng Nguy???n Ng???c V??, qu???n C???u Gi???y, H?? N???i
                </ListItem>
              </List>
            </Grid>
          </Grid>

          <Box sx={{ height: "3.2rem", mb: 4 }}>
            <img src={logo} alt="EZ Food Logo" style={{ height: "100%" }} />
          </Box>

          <Typography variant="body2">
            &copy; Copyright by Ho??ng Zo??n 2022
          </Typography>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
