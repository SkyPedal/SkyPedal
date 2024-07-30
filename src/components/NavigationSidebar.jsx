import React from "react";
import { Link } from "react-router-dom";

const NavigationSidebar = () => {
  return (
    <div className="w-1/5 sticky left-0 border-r-4">
      <ul className="p-5">
        <li className="p-5">
          <Link to="/">Home</Link>
        </li>
        <li className="p-5">
          <Link to="/">Record</Link>
        </li>
        <li className="p-5">
          <Link to="/">Compete</Link>
        </li>
        <li className="p-5">
          <Link to="/">Rewards</Link>
        </li>
        <li className="p-5 absolute bottom-0">
          <Link to="/">Sign in</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavigationSidebar;
