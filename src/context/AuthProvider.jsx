import { useState } from "react";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [userPoints, setUserPoints] = useState(0);

  const logout = () => {
    setUserId(null);
    setToken(null);
    setUserPoints(0);
  };

  return (
    <AuthContext.Provider
      value={{ userId, token, userPoints, setUserId, setToken, logout, setUserPoints }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
