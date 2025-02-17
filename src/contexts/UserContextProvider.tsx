import React, { createContext, useEffect, useReducer } from "react";

import request from "../services/api";
import * as auth from "../services/auth";

import authReducer from "../reducers/authReducer";
import { VERIFY_AUTH_SUCCESS, VERIFY_AUTH_FAILURE } from "../reducers/types";

export const UserContext = createContext(null);

export function UserContextProvider({ children }: any) {
  const initialState = {
    data: null,
    isAuthenticated: null,
  };

  const [user, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem("token") ?? ("" as string);
      request.defaults.headers["Authorization"] = `Bearer ${token}`;

      try {
        const { data } = await auth.user();
        console.log(data);
        dispatch({ type: VERIFY_AUTH_SUCCESS, payload: data });
      } catch {
        dispatch({ type: VERIFY_AUTH_FAILURE, payload: null });
      }
    };

    verifyAuth();
  }, []);

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
