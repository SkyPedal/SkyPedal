const ImpactOverview = () => {
  const categoryHeaderCSS = "text-sm text-left p-1 pl-4 text-gray-500";
  const categoryDataCSS = "text-lg p-1 pb-0";
  return (
    <div className="m-1 flex flex-col">
      <h1 className="text-center">Impact</h1>
      <hr />
      <i className={categoryHeaderCSS}>CO2 Saved</i>
      <p className={categoryDataCSS}>10kg</p>
      <i className={categoryHeaderCSS}>Distance Travelled</i>
      <p className={categoryDataCSS}>10miles</p>
      <i className={categoryHeaderCSS}>Hours Commuted</i>
      <p className={categoryDataCSS}>4 hours</p>
      <i className={categoryHeaderCSS}>Calories Burned</i>
      <p className={categoryDataCSS}>500cal</p>
      <i className={categoryHeaderCSS}>Money Saved</i>
      <p className={categoryDataCSS}>$10</p>
    </div>
  );
};

export default ImpactOverview;
