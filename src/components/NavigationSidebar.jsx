
import { Link } from "react-router-dom";
import HomeIcon from "../assets/icons/Home.svg";
import RecordIcon from "../assets/icons/Add.svg";
import CompeteIcon from "../assets/icons/Trophy.svg";
import RewardsIcon from "../assets/icons/Rewards.svg";
import SignInIcon from "../assets/icons/SignIn.svg";

// These links do not work when the screen is anything less than full screen, maybe collapse them to icons?
const NavigationSidebar = () => {
  return (
    <div
      className="w-20 md:w-52 sticky left-0 border-r-4 border-solid"
      style={{
        borderImage: "var(--sky-gradient-shape) 1",
        color: "var(--sky-indigo)",
      }}
    >
      <ul className="p-5">
        <li className="md:p-5 pt-5 pb-5">
          <Link to="/">
            <div className="flex h-12 items-center">
              <img src={HomeIcon} alt="Home" className="w-8" />
              <p className="pl-4 hidden md:block">Home</p>
            </div>
          </Link>
        </li>
        <li className="md:p-5 pt-5 pb-5">
          <Link to="/">
            <div className="flex h-12 items-center">
              <img src={RecordIcon} alt="Record" className="w-8" />
              <p className="pl-4 hidden md:block"> Record </p>
            </div>
          </Link>
        </li>
        <li className="md:p-5 pt-5 pb-5">
          <Link to="/">
            <div className="flex h-12 items-center">
              <img src={CompeteIcon} alt="Compete" className="w-8" />
              <p className="pl-4 hidden md:block"> Compete </p>
            </div>
          </Link>
        </li>
        <li className="md:p-5 pt-5 pb-5">
          <Link to="/">
            <div className="flex h-12 items-center">
              <img src={RewardsIcon} alt="Rewards" className="w-8" />
              <p className="pl-4 hidden md:block"> Rewards </p>
            </div>
          </Link>
        </li>
        <li className="md:p-5 pt-5 pb-5 absolute bottom-0">
          <Link to="/signin">
            <div className="flex h-12 items-center">
              <img src={SignInIcon} alt="SignIn" className="w-8" />
              <p className="pl-4 hidden md:block"> Sign In</p>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavigationSidebar;
