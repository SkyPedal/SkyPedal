import { createContext, useContext } from "react";

const AuthContext = createContext({
  userId: null,
  token: null,
  setUserId: () => {},
  setToken: () => {},
  logout: () => {},
});

export default AuthContext;

/* SAMPLE USAGE
  const auth = useAuth();
  auth.setUserId("123");
  auth.setToken("abc");
  auth.logout(); // clears userId and token
*/
export const useAuth = () => {
  return useContext(AuthContext);
};
