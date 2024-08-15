import { Link, useNavigate } from "react-router-dom";
import Button from "./signInPage/Button";
import { useAuth } from "../context/AuthContext";
import useApi from "../repos/api";
import { useState } from "react";

const SignInPage = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const api = useApi(auth);
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    const query = {login: inputEmail, password: inputPassword}
    const signin = await api.queryAuthenticate(query)
    if(signin.error){
      setError(signin.error)
    }
    else{
      auth.setToken(signin.data.accessToken)
      const me = await api.getCurrentUser(signin.data.accessToken); 
      auth.setUserId(me.data.id)
      navigate('/profile');
    }
  };

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="p-16 bg-white border rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-3xl font-bold mb-6 sky-gradient-text">Let's Get Started</h1>

        <div className="mb-6">
          <label className="block text-lg mb-2 text-sky-indigo">Sky Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 border border-gray-300 rounded text-sky-indigo"
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg mb-2 text-sky-indigo">Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full p-3 border border-gray-300 rounded text-sky-indigo"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
          />
        </div>

        <div className="text-right mb-6">
          <a href="/forgot-password" className="text-sky-indigo">
            Forgot Password?
          </a>
        </div>

        <div className="flex justify-between">
          <Link to="/signup">
            <Button className="bg-sky-indigo text-gray-300 p-3 rounded">
              Sign Up
            </Button>
          </Link>
          <Button className="bg-sky-indigo text-gray-300 p-3 rounded" onClick={handleSignIn}>
            Sign In
          </Button>
        </div>
        <div>{error}</div>
      </div>
    </div>
  );
};

export default SignInPage;
