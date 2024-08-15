import { useState, useEffect } from "react";
import { DATABASE_URL } from "../../config.json";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import RewardHeader from "./RewardHeader";
import { useAuth } from "../../context/AuthContext";


// add value which tracks whether reward needs to be activated or moved from available to activatable
const Reward = () => {
  const [reward, setReward] = useState({});
  const [error, setError] = useState(null);

  const { rewardId, rewardStatus } = useParams();
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      setReward(await getReward());
    };

    getData();
  }, [rewardId]);

  const getReward = async () => {
    try {
      const res = await axios.get(`${DATABASE_URL}/rewards/${rewardId}`, { headers: {
        'Authorization': `Bearer ${token}`
        
    } });
      console.log(res);
      return res.data.usersRewards.length
        ? { rewards: res.data }
        : { error: `No information about this reward available` };
    } catch (e) {
      setError(`Data not available from server: ${e.message}`);
      return { error: `Data not available from server: ${e.message}` };
    }
  };

  const redeemUserReward = async (rewardId, userId) => {
    try {
      const response = await axios.post(
        `${DATABASE_URL}/users_rewards`,
        { rewardId, userId },
      );
      return { data: response.data };
    } catch (error) {
      return { error: `Error fetching data: ${error}` };
    }
  }

  const activateUserReward = async (userRewardId) => {
    try {
        const response = await axios.patch(
          `${DATABASE_URL}/users_rewards/${userRewardId}`,
        );
        return { data: response.data };
      } catch (error) {
        return { error: `Error fetching data: ${error}` };
      }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("IM SUBMITTING");
    handleSave();
  };

  const handleSave = async () => {
    setError("");

    if (rewardStatus == "activate") {
        const success = await redeemUserReward(reward?.rewards?.id, auth.userId);
    } else if (rewardStatus == "redeem") {
        const success = await activateUserReward(reward?.rewards?.usersRewards.id);
    }
    console.log("Submit: ", success, error);
    navigate("/rewards");
  };

  const addButton = () => {

    if (rewardStatus == "activate") {
        return (
            <button
                name="save"
                type="submit"
                className="mt-5 max-h-10 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:bg-red-300"
            >
                Activate Reward
            </button>
        );
    } else if (rewardStatus == "redeem") {
        return (
            <button
                name="save"
                type="submit"
                className="mt-5 max-h-10 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:bg-red-300"
            >
                Redeem Reward
            </button>
        );
    } else setError(`Error setting reward status`);
    
  }

  if (error) {
    return <div className="mx-auto max-w-4xl p-4">Error: {error.message}</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-md">
         <RewardHeader rewardName={reward?.rewards?.name} />

        <table className="w-full p-5 border-spacing-2 border-separate"><tbody>
        <tr>
            <td className="rounded-l-lg bg-slate-200">{reward?.rewards?.name}</td>
            <td rowspan="4" className="rounded-r-lg bg-slate-200">Image Link: {reward?.rewards?.imageLink}</td>
        </tr>
        <tr>
            <td className="rounded-l-lg bg-slate-200">{reward?.rewards?.description}</td>
        </tr>
        <tr>
            <td className="rounded-l-lg bg-slate-200">Cost: {reward?.rewards?.pointCost}</td>
        </tr>
        <tr>
            <td className="rounded-l-lg bg-slate-200">Number available: {reward?.rewards?.numberAvailable}</td>
        </tr></tbody>
        </table>

        {addButton()}

        <p>{reward?.rewards?.usersRewards}</p>
    </form>
  );
};

export default Reward;
