// src/components/SignUpPage.js
import React from "react";

const SignUpPage = () => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="p-16 bg-white border rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-3xl font-bold mb-6 text-sky-indigo">Sign Up</h1>

        <div className="mb-6">
          <label className="block text-lg mb-2 text-sky-indigo">Sky Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 border border-gray-300 rounded text-sky-indigo"
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg mb-2 text-sky-indigo">Username:</label>
          <input
            type="username"
            placeholder="Enter your username"
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


        <div className="mb-6">
          <label className="block text-lg mb-2 text-sky-indigo">Confirm Password:</label>
          <input
            type="password"
            placeholder="Confirm your password"
            className="w-full p-3 border border-gray-300 rounded text-sky-indigo"
          />
        </div>

        <button className="bg-sky-indigo text-white p-3 rounded w-full">Sign Up</button>
      </div>
    </div>
  );
};

export default SignUpPage;
