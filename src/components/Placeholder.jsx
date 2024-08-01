import React from "react";
import { Link } from "react-router-dom";
import Button from "./signInPage/Button";

const Placeholder = () => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="p-16 bg-white border rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-3xl font-bold mb-6 text-sky-indigo">Sign In</h1>

        <div className="mb-6">
          <label className="block text-lg mb-2 text-sky-indigo">Sky Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 border border-gray-300 rounded text-sky-indigo"
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg mb-2 text-sky-indigo">Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full p-3 border border-gray-300 rounded text-sky-indigo"
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
          <Link to="/signin">
            <Button className="bg-sky-indigo text-gray-300 p-3 rounded">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Placeholder;
