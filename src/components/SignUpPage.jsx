import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../repos/api";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const SignUpPage = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const api = useApi(auth);
  const [inputFirstName, setInputFirstName] = useState("");
  const [inputLastName, setInputLastName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputConfirmPassword, setInputConfirmPassword] = useState("");
  const [inputOffice, setInputOffice] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    const query = {
      firstName: inputFirstName,
      lastName: inputLastName,
      email: inputEmail,
      password: inputPassword,
      rewardPoints: 0,
      officeLocation: inputOffice,
    };

    let emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

    if (!emailRegex.test(inputEmail)) {
      setError("Not a valid email");
      return;
    }

    if (inputPassword.length < 8) {
      setError("Password is too short");
      return;
    }

    if (inputConfirmPassword !== inputPassword) {
      setError("Passwords do not match");
      return;
    }

    const signup = await api.queryRegister(query);
    if (signup.error) {
      if (signup.error.includes("403"))
        setError(
          <span className="text-red-500">Please enter required fields</span>,
        );
      else setError(signup.error);
    } else {
      const query2 = { login: inputEmail, password: inputPassword };
      const signin = await api.queryAuthenticate(query2);
      if (signin.error) {
        setError(signin.error);
      } else {
        auth.setToken(signin.data.accessToken);
        const me = await api.getCurrentUser(signin.data.accessToken);
        auth.setUserId(me.data.id);
        navigate("/");
      }
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="w-full max-w-lg rounded-lg border bg-white p-16 shadow-lg">
        <h1 className="sky-gradient-text mb-6 text-3xl font-bold">Sign Up</h1>

        <div className="mb-6">
          <label className="text-sky-indigo mb-2 block text-lg">
            Sky Email:
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="text-sky-indigo w-full rounded border border-gray-300 p-3"
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="text-sky-indigo mb-2 block text-lg">
            First Name:
          </label>
          <input
            type="text"
            placeholder="Enter your firstname"
            className="text-sky-indigo w-full rounded border border-gray-300 p-3"
            value={inputFirstName}
            onChange={(e) => setInputFirstName(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="text-sky-indigo mb-2 block text-lg">Surname:</label>
          <input
            type="text"
            placeholder="Enter your surname"
            className="text-sky-indigo w-full rounded border border-gray-300 p-3"
            value={inputLastName}
            onChange={(e) => setInputLastName(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="text-sky-indigo mb-2 block text-lg">Office:</label>
          <input
            type="text"
            placeholder="Enter your office"
            className="text-sky-indigo w-full rounded border border-gray-300 p-3"
            value={inputOffice}
            onChange={(e) => setInputOffice(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="text-sky-indigo mb-2 block text-lg">
            Password:
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="text-sky-indigo w-full rounded border border-gray-300 p-3"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="text-sky-indigo mb-2 block text-lg">
            Confirm Password:
          </label>
          <input
            type="password"
            placeholder="Confirm your password"
            className="text-sky-indigo w-full rounded border border-gray-300 p-3"
            value={inputConfirmPassword}
            onChange={(e) => setInputConfirmPassword(e.target.value)}
          />
        </div>

        <button
          className="bg-sky-indigo w-full rounded p-3 text-white"
          onClick={handleSignUp}
        >
          Sign Up
        </button>
        <div className="err">{error}</div>
      </div>
    </div>
  );
};

export default SignUpPage;
