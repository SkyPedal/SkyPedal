import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const handleDeleteAccount = () => {
    // Add any account deletion logic here
    // After deletion, navigate to the sign-in page
    navigate('/signin');
  };

  return (
    <div className="flex items-center justify-center h-full w-full p-8">
      <div className="bg-white border rounded-lg shadow-lg p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-sky-indigo">Profile Settings</h1>

        <div className="mb-6">
          <label className="block text-lg mb-2 text-sky-indigo">Preferred Mode of Transport</label>
          <input
            type="text"
            placeholder="Preferred Mode of Transport"
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>

        <div className="flex mb-6">
          <div className="w-1/2 mr-2">
            <label className="block text-lg mb-2 text-sky-indigo">Office</label>
            <input
              type="text"
              placeholder="Office"
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div>
          <div className="w-1/2 ml-2">
            <label className="block text-lg mb-2 text-sky-indigo">Saved Home (optional)</label>
            <input
              type="text"
              placeholder="Saved Home (optional)"
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div>
        </div>

        <button onClick={handleDeleteAccount} className="bg-red-600 text-white p-3 rounded">
          Delete My Account
        </button>
      </div>
    </div>
  );
};

export default Profile;
