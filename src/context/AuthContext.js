import { createContext, useContext } from "react";

const AuthContext = createContext({
  userId: null,
  token: null,
  setUserId: () => {},
  setToken: () => {},
  logout: () => {},
  userPoints: 0,
  setUserPoints: () => {},
});

export default AuthContext;

export const useAuth = () => {
  return useContext(AuthContext);
};
