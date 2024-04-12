import { useContext } from "react";
import { Route, Navigate } from "react-router-dom";

import { UserContext } from "../contexts/UserContextProvider";

export function AuthenticatedRoute({ element: Element, ...rest }: any) {
  const { user } = useContext(UserContext) as any;

  return (
    <Route
      {...rest}
      element={
        user.data && user.isAuthenticated ? (
          <Element />
        ) : (
          <Navigate to="/login" replace />
        )
      }
    />
  );
}

export default AuthenticatedRoute;
