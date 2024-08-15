import { createContext, useContext } from "react";

const AuthContext = createContext({
  userId: null,
  token: null,
  setUserId: () => {},
  setToken: () => {},
  logout: () => {},
});

export default AuthContext;

export const useAuth = () => {
  return useContext(AuthContext);
};
