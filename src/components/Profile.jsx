import { useEffect, useState } from "react";
import useApi from "../repos/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import profilePicture from "../assets/icons/user.png";

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

  const handleDeleteAccount = async () => {
    await api.deleteAccount(auth.userId);
    auth.logout();
    navigate("/signin");
  };
  const handleLogout = async () => {
    auth.logout();
    navigate("/signin");
  };

  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <div className="w-full max-w-2xl rounded-lg border bg-white p-8 shadow-lg">
        <h1 className="sky-gradient-text mb-6 text-3xl font-bold">
          Profile Settings
        </h1>

        <div className="mb-6">
          <img
            src={profilePicture}
            alt="Profile"
            className="mx-auto w-1/2 rounded border border-gray-300 p-3"
          />
        </div>

        <div className="mb-6">
          <label className="text-sky-indigo mb-2 block text-lg">Email</label>
          <p className="w-full rounded border border-gray-300 bg-gray-100 p-3">
            {userData?.email}
          </p>
        </div>

        <div className="mb-6 flex">
          <div className="mr-2 w-1/2">
            <label className="text-sky-indigo mb-2 block text-lg">
              First Name
            </label>
            <p className="w-full rounded border border-gray-300 bg-gray-100 p-3">
              {userData?.firstName}
            </p>
          </div>
          <div className="ml-2 w-1/2">
            <label className="text-sky-indigo mb-2 block text-lg">
              Last Name
            </label>
            <p className="w-full rounded border border-gray-300 bg-gray-100 p-3">
              {userData?.lastName}
            </p>
          </div>
        </div>

        <div className="mb-6 flex">
          <div className="mr-2 w-1/2">
            <label className="text-sky-indigo mb-2 block text-lg">Office</label>
            <p className="w-full rounded border border-gray-300 bg-gray-100 p-3">
              {userData?.officeLocation}
            </p>
          </div>
          <div className="ml-2 w-1/2">
            <label className="text-sky-indigo mb-2 block text-lg">
              Points Remaining
            </label>
            <p className="w-full rounded border border-gray-300 bg-gray-100 p-3">
              {auth.userPoints}
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleLogout}
            className="mr-5 rounded bg-blue-600 p-3 text-white"
          >
            Logout
          </button>
          <button
            onClick={handleDeleteAccount}
            className="rounded bg-red-600 p-3 text-white"
          >
            Delete My Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
