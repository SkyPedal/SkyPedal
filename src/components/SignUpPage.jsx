import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../repos/api";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";


const SignUpPage = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const api = useApi(auth);
  const [inputFirstName, setInputFirstName] = useState('');
  const [inputLastName, setInputLastName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputConfirmPassword, setInputConfirmPassword] = useState('');
  const [inputOffice, setInputOffice] = useState('');
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    const query = {firstName: inputFirstName, lastName: inputLastName, email: inputEmail, password: inputPassword, rewardPoints: 0, officeLocation: inputOffice};

    const signup = await api.queryRegister(query)
    if(signup.error) {
      setError(signup.error)
    }
    else
    {
      const query2 = {login: inputEmail, password: inputPassword}
      const signin = await api.queryAuthenticate(query2)
      if(signin.error){
        setError(signin.error)
      }
      else {
        auth.setToken(signin.data.accessToken)
        const me = await api.getCurrentUser(signin.data.accessToken); 
        auth.setUserId(me.data.id); 
        navigate('/profile');
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="p-16 bg-white border rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-3xl font-bold mb-6 sky-gradient-text">Sign Up</h1>

        <div className="mb-6">
          <label className="block text-lg mb-2 text-sky-indigo ">Sky Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 border border-gray-300 rounded text-sky-indigo "
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg mb-2 text-sky-indigo">First Name:</label>
          <input
            type="text"
            placeholder="Enter your firstname"
            className="w-full p-3 border border-gray-300 rounded text-sky-indigo"
            value={inputFirstName}
            onChange={(e) => setInputFirstName(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg mb-2 text-sky-indigo">Surname:</label>
          <input
            type="text"
            placeholder="Enter your surname"
            className="w-full p-3 border border-gray-300 rounded text-sky-indigo"
            value={inputLastName}
            onChange={(e) => setInputLastName(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg mb-2 text-sky-indigo">Office:</label>
          <input
            type="text"
            placeholder="Enter your office"
            className="w-full p-3 border border-gray-300 rounded text-sky-indigo"
            value={inputOffice}
            onChange={(e) => setInputOffice(e.target.value)}
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

        <div className="mb-6">
          <label className="block text-lg mb-2 text-sky-indigo">Confirm Password:</label>
          <input
            type="password"
            placeholder="Confirm your password"
            className="w-full p-3 border border-gray-300 rounded text-sky-indigo"
            value={inputConfirmPassword}
            onChange={(e) => setInputConfirmPassword(e.target.value)}
          />
        </div>

        <button
          className="bg-sky-indigo text-white p-3 rounded w-full"
          onClick={handleSignUp}
        >
          Sign Up
        </button>
        <div>{error}</div>
      </div>
    </div>
  );
};

export default SignUpPage;
