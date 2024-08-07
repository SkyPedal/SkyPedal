import { Link, useNavigate } from "react-router-dom";
import Button from "./signInPage/Button";

const SignInPage = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    //add sign in logic
    navigate('/profile');
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
          <Button className="bg-sky-indigo text-gray-300 p-3 rounded" onClick={handleSignIn}>
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
