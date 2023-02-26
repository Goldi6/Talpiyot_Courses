import React, { createContext, useReducer } from "react";
import userReducer, { initialUserData } from "../Reducers/UserReducer";
import { getUserFromCookie } from "../Cookies/cookies";

export const UserContext = createContext(null);

export default function UserContextProvider({ children }) {
  const cookieUserData = getUserFromCookie();
  const [userData, userDispatch] = useReducer(
    userReducer,
    cookieUserData || initialUserData
  );
  return (
    <UserContext.Provider value={{ userData, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
}
