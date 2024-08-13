import React from "react";
import CompetitionOverview from "./info/CompetionOverview";
import ImpactOverview from "./info/ImpactOverview";
import RewardsOverview from "./info/RewardsOverview";

const InfoSidebar = () => {
  return (
    <div
      className="hidden md:flex md:flex-col justify-evenly basis-52 h-full sticky right-0 border-l-4 border-solid"
      style={{
        borderImage: "var(--sky-gradient-shape) 1",
        color: "var(--sky-indigo)",
      }}
    >
      <ImpactOverview />
      <CompetitionOverview />
      <RewardsOverview />
    </div>
  );
};

export default InfoSidebar;
