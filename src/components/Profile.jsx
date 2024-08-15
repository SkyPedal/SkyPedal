import { useEffect, useState } from 'react';
import  useApi  from '../repos/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
import profilePicture from '../assets/icons/user.png'; 

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const auth = useAuth();
  const api = useApi(auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await api.queryUserById();
      if (data) {
        setUserData(data);
      } else {
        console.error(error);
      }
    };

    fetchUserData();
  }, [api, auth.userId]);

  const handleDeleteAccount = () => {
    // Account deletion logic
    navigate('/signin');
  };

  return (
    <div className="flex items-center justify-center h-full w-full p-8">
      <div className="bg-white border rounded-lg shadow-lg p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 sky-gradient-text">Profile Settings</h1>

        <div className="mb-6">
          <img
            src={profilePicture}
            alt="Profile"
            className="p-3 border w-1/2 border-gray-300 rounded mx-auto"
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg mb-2 text-sky-indigo">Email</label>
          <p className="w-full p-3 border border-gray-300 rounded bg-gray-100">{userData?.email}</p>
        </div>

        <div className="flex mb-6">
          <div className="w-1/2 mr-2">
            <label className="block text-lg mb-2 text-sky-indigo">First Name</label>
            <p className="w-full p-3 border border-gray-300 rounded bg-gray-100">{userData?.firstName}</p>
          </div>
          <div className="w-1/2 ml-2">
            <label className="block text-lg mb-2 text-sky-indigo">Last Name</label>
            <p className="w-full p-3 border border-gray-300 rounded bg-gray-100">{userData?.lastName}</p>
          </div>
        </div>

        <div className="flex mb-6">
          <div className="w-1/2 mr-2">
            <label className="block text-lg mb-2 text-sky-indigo">Office</label>
            <p className="w-full p-3 border border-gray-300 rounded bg-gray-100">{userData?.officeLocation}</p>
          </div>
          <div className="w-1/2 ml-2">
            <label className="block text-lg mb-2 text-sky-indigo">Points Remaining</label>
            <p className="w-full p-3 border border-gray-300 rounded bg-gray-100">0</p>
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
