import { Link } from "react-router-dom";
import HomeIcon from "../assets/icons/Home.svg";
import RecordIcon from "../assets/icons/Add.svg";
import CompeteIcon from "../assets/icons/Trophy.svg";
import RewardsIcon from "../assets/icons/Rewards.svg";
import SignInIcon from "../assets/icons/SignIn.svg";
import { useAuth } from "../context/AuthContext";

// These links do not work when the screen is anything less than full screen, maybe collapse them to icons?
const NavigationSidebar = () => {
  const auth = useAuth();
  return (
    <div
      className="sticky left-0 w-20 border-r-4 border-solid md:w-52"
      style={{
        borderImage: "var(--sky-gradient-shape) 1",
        color: "var(--sky-indigo)",
      }}
    >
      <ul className="p-5">
        <li className="pb-5 md:pt-5">
          <Link to={auth.token ? "/" : "/signin"}>
            <div className="flex h-12 items-center rounded-lg transition hover:bg-red-100 md:p-4">
              <img src={HomeIcon} alt="Home" className="w-8" />
              <p className="hidden pl-4 md:block">Home</p>
            </div>
          </Link>
        </li>
        <li className="pb-5 md:pt-5">
          <Link to={auth.token ? "/record" : "/signin"}>
            <div className="flex h-12 items-center rounded-lg transition hover:bg-red-100 md:p-4">
              <img src={RecordIcon} alt="Record" className="w-8" />
              <p className="hidden pl-4 md:block"> Record </p>
            </div>
          </Link>
        </li>
        <li className="pb-5 md:pt-5">
          <Link to={auth.token ? "/compete" : "/signin"}>
            <div className="flex h-12 items-center rounded-lg transition hover:bg-red-100 md:p-4">
              <img src={CompeteIcon} alt="Compete" className="w-8" />
              <p className="hidden pl-4 md:block"> Compete </p>
            </div>
          </Link>
        </li>
        <li className="pb-5 md:pt-5">
          <Link to={auth.token ? "/rewards" : "/signin"}>
            <div className="flex h-12 items-center rounded-lg transition hover:bg-red-100 md:p-4">
              <img src={RewardsIcon} alt="Rewards" className="w-8" />
              <p className="hidden pl-4 md:block"> Rewards </p>
            </div>
          </Link>
        </li>
        <li className="absolute bottom-0 pb-5 md:pt-5">
          {auth.token ? (
            <Link to="/profile">
              <div className="flex h-12 items-center rounded-lg transition hover:bg-red-100 md:p-4">
                <img src={SignInIcon} alt="SignIn" className="w-8" />
                <p className="hidden pl-4 md:block">Profile</p>
              </div>
            </Link>
          ) : (
            <Link to="/signin">
              <div className="flex h-12 items-center rounded-lg transition hover:bg-red-100 md:p-4">
                <img src={SignInIcon} alt="SignIn" className="w-8" />
                <p className="hidden pl-4 md:block">Sign In</p>
              </div>
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default NavigationSidebar;
