import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import useApi from "../../repos/api";
import { Link } from "react-router-dom";

const RewardsOverview = () => {
  const categoryHeaderCSS = "text-sm text-left p-1 pl-4 text-gray-500";
  const categoryDataCSS = "text-lg p-1 pb-0 hover:underline";
  const auth = useAuth();
  const { userId, token, userPoints } = auth;
  const api = useApi(auth);

  const [rewards, setRewardsActive] = useState({});
  const [user, setUser] = useState({});
  const [getError, setGetError] = useState(``);

  useEffect(() => {
    const getData = async () => {
      const res = await api.getRewardsActive();
      setRewardsActive(res);
      if (res.error)
        setGetError(`Data not available from server: ${res.error.message}`);
      console.log("response of rewards: ", rewards);
    };

    getData();
  }, [auth, userPoints]);

  useEffect(() => {
    const getData = async () => {
      const res = await api.queryUserById();
      setUser(res);
      auth.setUserPoints(res.data?.rewardPoints);

      if (res.error)
        setGetError(`Data not available from server: ${res.error.message}`);
    };

    getData();
  }, [auth, userPoints]);

  return (
    <div className="m-1 flex flex-col">
      <h1 className="text-center">Rewards</h1>
      <hr />
      <i className={categoryHeaderCSS}>Points</i>
      <p className={categoryDataCSS}>{userPoints}</p>
      <i className={categoryHeaderCSS}>Active Rewards</i>
      {rewards?.rewards?.slice(0, 3).map((reward) => {
        const {
          id,
          dateRedeemed,
          dateExpiry,
          hasUsed,
          rewardId,
          userId,
          rewardName,
        } = reward;
        // const reward = new RewardModel( rewardName={rewardName}, rewardAmountRemaining={rewardAmountRemaining}, rewardPointCost={rewardPointCost}, _id={_id});
        return (
          <Link
            className={categoryDataCSS}
            to={`/rewards/${rewardId}/activate/${id}`}
          >
            {rewardName}
          </Link>
        );
      })}
    </div>
  );
};

export default RewardsOverview;
