import { Link, useNavigate } from "react-router-dom";
import Button from "./signInPage/Button";
import { useAuth } from "../context/AuthContext";
import useApi from "../repos/api";
import { useState } from "react";

const SignInPage = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const api = useApi(auth);
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    const query = { login: inputEmail, password: inputPassword };
    const signin = await api.queryAuthenticate(query);
    if (signin.error) {
      if (signin.error.includes("403"))
        setError(
          <span className="text-red-500">Invalid email or password</span>,
        );
      else setError(signin.error);
    } else {
      auth.setToken(signin.data.accessToken);
      const me = await api.getCurrentUser(signin.data.accessToken);
      auth.setUserId(me.data.id);
      navigate("/");
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="w-full max-w-lg rounded-lg border bg-white p-16 shadow-lg">
        <h1 className="sky-gradient-text mb-6 text-3xl font-bold">
          Let&apos;s Get Started
        </h1>

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

        <div className="mb-6 text-right">
          <a href="/forgot-password" className="text-sky-indigo">
            Forgot Password?
          </a>
        </div>

        <div className="flex justify-between">
          <Link to="/signup">
            <Button className="bg-sky-indigo rounded p-3 text-gray-300">
              Sign Up
            </Button>
          </Link>
          <Button
            className="bg-sky-indigo rounded p-3 text-gray-300"
            onClick={handleSignIn}
          >
            Sign In
          </Button>
        </div>
        <div>{error}</div>
      </div>
    </div>
  );
};

export default SignInPage;
