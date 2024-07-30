import { createContext, useContext } from "react";

const AuthContext = createContext();

export default AuthContext;

export const useAuth = () => {
  return useContext(AuthContext);
};
