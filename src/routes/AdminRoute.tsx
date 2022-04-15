import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"
import jwtDecode, { JwtPayload } from "jwt-decode"

import { ROUTES } from "constants/routes"
import { LayoutPrivate } from "Layouts/LayoutPrivate"
import { IAppState, useAppThunkDispatch } from "store/store"
import { TokenStorage } from "constants/tokenStorage"
import { isJwtValid } from "utils/validators"
import { logout } from "store/users/usersSlice"
import { ADMIN_ROLES } from "constants/other"

export const AdminRoute: React.FC = ({ children }) => {
  const { authenticated, role } = useSelector((s: IAppState) => s.userState);
  const navigate = useNavigate();
  const dispatch = useAppThunkDispatch();

  const token = TokenStorage.getToken();

  useEffect(() => {
    if (!authenticated || !token) {
      navigate(ROUTES.LOGIN);
    }
  }, [authenticated])

  if (token) {
    const decodedToken: JwtPayload = jwtDecode(token || '');
    if (!isJwtValid(decodedToken)) {
      dispatch(logout());
      return <Navigate to={ROUTES.LOGIN} />
    }
  }

  if (!ADMIN_ROLES.includes(role)) {
    return <Navigate to={ROUTES.DASHBOARD} />
  }

  return (
    <LayoutPrivate>
      {children}
    </LayoutPrivate>
  )
}