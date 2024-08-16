import React from "react";
import CompetitionOverview from "./info/CompetionOverview";
import ImpactOverview from "./info/ImpactOverview";
import RewardsOverview from "./info/RewardsOverview";

const InfoSidebar = () => {
  return (
    <div
      className="sticky right-0 hidden h-full basis-52 justify-evenly border-l-4 border-solid md:flex md:flex-col"
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
