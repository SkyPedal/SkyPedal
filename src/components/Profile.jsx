import { useNavigate } from "react-router-dom";
import profilePicture from '../assets/icons/user.png'; // Corrected import path

const Profile = () => {
  const navigate = useNavigate();

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
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg mb-2 text-sky-indigo">Email</label>
          <p className="w-full p-3 border border-gray-300 rounded bg-gray-100">Sam@mail.com</p>
        </div>

        <div className="flex mb-6">
          <div className="w-1/2 mr-2">
            <label className="block text-lg mb-2 text-sky-indigo">First Name</label>
            <p className="w-full p-3 border border-gray-300 rounded bg-gray-100">Sam</p>
          </div>
          <div className="w-1/2 ml-2">
            <label className="block text-lg mb-2 text-sky-indigo">Last Name</label>
            <p className="w-full p-3 border border-gray-300 rounded bg-gray-100">Elliott</p>
          </div>
        </div>

        <div className="flex mb-6">
          <div className="w-1/2 mr-2">
            <label className="block text-lg mb-2 text-sky-indigo">Office</label>
            <p className="w-full p-3 border border-gray-300 rounded bg-gray-100">Brentwood</p>
          </div>
          <div className="w-1/2 ml-2">
            <label className="block text-lg mb-2 text-sky-indigo">Points Remaining</label>
            <p className="w-full p-3 border border-gray-300 rounded bg-gray-100">42</p>
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
