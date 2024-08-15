import { useState } from "react";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  const logout = () => {
    setUserId(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ userId, token, setUserId, setToken, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
