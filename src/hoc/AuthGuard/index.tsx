import { FirebaseAuthService } from "../../firebase/authService";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { adminLoginState } from "states/admin";
import { Navigate } from "react-router-dom";

const AuthGuard = (component: React.ReactNode) => {
  const [adminState, setAdminState] = useRecoilState(adminLoginState);

  useEffect(() => {
    if (adminState) return;

    FirebaseAuthService.subscribeToAuthChanges(setAdminState);
  }, [setAdminState, adminState]);

  if (adminState) {
    return component;
  }

  return <Navigate to="/login" />;
};

export default AuthGuard;
