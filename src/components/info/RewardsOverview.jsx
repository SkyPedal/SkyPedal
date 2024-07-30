const RewardsOverview = () => {
  const categoryHeaderCSS = "text-sm text-left p-1 pl-4 text-gray-500";
  const categoryDataCSS = "text-lg p-1 pb-0";
  return (
    <div className="m-1 flex flex-col">
      <h1 className="text-center">Rewards</h1>
      <hr />
      <i className={categoryHeaderCSS}>Points</i>
      <p className={categoryDataCSS}>100</p>
      <i className={categoryHeaderCSS}>Active Rewards</i>
      <p className={categoryDataCSS}>Reward 1</p>
      <p className={categoryDataCSS}>Reward 2</p>
      <p className={categoryDataCSS}>Reward 3</p>
    </div>
  );
};

export default RewardsOverview;
