const CompetitionOverview = () => {
  const categoryHeaderCSS = "text-sm text-left p-1 pl-4 text-gray-500";
  const categoryDataCSS = "text-lg p-1 pb-0";
  return (
    <div className="m-1 flex flex-col">
      <h1>Leaderboard</h1>
      <hr />
      <i className={categoryHeaderCSS}>Position (Week)</i>
      <p className={categoryDataCSS}>2nd</p>

      <i className={categoryHeaderCSS}>Position (Month)</i>
      <p className={categoryDataCSS}>3rd</p>
    </div>
  );
};

export default CompetitionOverview;
