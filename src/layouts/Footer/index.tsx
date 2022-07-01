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
                <ListItemHeading>Thông tin liên hệ</ListItemHeading>
                <ListItem>Cửa hàng kinh doanh đồ ăn nhanh EZ Food</ListItem>
                <ListItem>
                  <span className="link-title">☎️ Hotline:&nbsp;</span>
                  <a className="link-text" href="tel:037.982.6688">
                    037.982.6688
                  </a>
                </ListItem>
                <ListItem>
                  <span className="link-title">✉️ Email:&nbsp;</span>
                  <a className="link-text" href="mailto:support@ez-food.com">
                    support@ez-food.com
                  </a>{" "}
                </ListItem>
              </List>
            </Grid>

            <Grid item xs={12} md="auto">
              <List sx={{ p: 0 }}>
                <ListItemHeading>Thực đơn</ListItemHeading>
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
                <ListItemHeading>Các cơ sở</ListItemHeading>
                <ListItem>
                  Cơ sở 1: Số 11, phố Nguyễn Khắc Cần, quận Hoàn Kiếm, Hà Nội
                </ListItem>
                <ListItem>
                  Cơ sở 2: Số 93, phố Giang Văn Minh, quận Ba Đình, Hà Nội
                </ListItem>
                <ListItem>
                  Cơ sở 3: Số 131, đường Nguyễn Ngọc Vũ, quận Cầu Giấy, Hà Nội
                </ListItem>
              </List>
            </Grid>
          </Grid>

          <Box sx={{ height: "3.2rem", mb: 4 }}>
            <img src={logo} alt="EZ Food Logo" style={{ height: "100%" }} />
          </Box>

          <Typography variant="body2">
            &copy; Copyright by Hoàng Zoãn 2022
          </Typography>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
