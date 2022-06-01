import { Button as MuiButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { styled } from "shared/theme";
import { adminLoginState } from "states/admin";
import { FirebaseAuthService } from "../../../firebase/authService";

const Button = styled(MuiButton)({
  backgroundColor: "rgba(255, 255, 255, 0.15)",
  color: "white",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  padding: "0.8rem 1.6rem",
});

const LogoutButton = () => {
  const navigate = useNavigate();
  const setAdminState = useSetRecoilState(adminLoginState);

  const handleLogout = async () => {
    await FirebaseAuthService.logoutUser();
    setAdminState(null);
    navigate("/login");
  };

  return <Button onClick={handleLogout}>Đăng xuất</Button>;
};

export default LogoutButton;
